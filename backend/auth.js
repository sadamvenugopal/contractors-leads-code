require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const sgMail = require('@sendgrid/mail');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const router = express.Router();

// Initialize Firebase Admin
initializeApp({ credential: applicationDefault() });
const db = getFirestore();
const usersCollection = db.collection('users');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Initialize SendGrid with the API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Session setup for Passport
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // Set to true in production with HTTPS
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
            httpOnly: true, // Prevent access via JavaScript
            sameSite: 'lax' // Default to lax
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        // Check if the user already exists in Firestore
        let userQuery = await usersCollection.where('email', '==', email).where('provider', '==', 'google').get();

        if (userQuery.empty) {
            // Create a new user document in Firestore
            const newUserRef = usersCollection.doc();
            await newUserRef.set({
                email,
                name,
                provider: 'google',
                verified: true, // Social logins are automatically verified
                createdAt: new Date().toISOString()
            });

            // Fetch the newly created user document
            userQuery = await usersCollection.doc(newUserRef.id).get();

            // Send a welcome email to the new user
            const msg = {
                to: email,
                from: process.env.EMAIL_FROM,
                subject: 'Welcome to Trivaj!',
                text: `Hi ${name},\n\nWelcome to Trivaj! We're excited to have you on board.`,
                html: `<p>Hi ${name},</p><p>Welcome to <strong>Trivaj</strong>! We're excited to have you on board.</p>`
            };
            await sgMail.send(msg);
        } else {
            // User already exists, fetch the first matching document
            userQuery = userQuery.docs[0];
        }

        // Generate JWT token for the user
        const user = userQuery.data();
        const token = jwt.sign({ userId: userQuery.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return done(null, { token, user });
    } catch (error) {
        console.error('Error during Google OAuth:', error);
        return done(error, false);
    }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Facebook profile:', profile); // Add this line for debugging

        let email = '';
        let name = '';

        if (profile.emails && profile.emails.length > 0) {
            email = profile.emails[0].value;
        } else {
            console.warn('No email found in the Facebook profile.');
            return done(null, false, { message: 'No email found in the Facebook profile.' });
        }

        if (profile.name && profile.name.givenName && profile.name.familyName) {
            name = `${profile.name.givenName} ${profile.name.familyName}`;
        } else if (profile.displayName) {
            name = profile.displayName;
        } else {
            console.warn('No name found in the Facebook profile.');
            name = 'Unknown User';
        }

        let userQuery = await usersCollection.where('email', '==', email).where('provider', '==', 'facebook').get();
        if (userQuery.empty) {
            const newUserRef = usersCollection.doc();
            await newUserRef.set({
                email,
                name,
                provider: 'facebook',
                verified: true, // Social logins are automatically verified
                createdAt: new Date().toISOString()
            });
            userQuery = await usersCollection.doc(newUserRef.id).get();
        } else {
            userQuery = userQuery.docs[0];
        }
        const user = userQuery.data();
        const token = jwt.sign({ userId: userQuery.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return done(null, { token, user });
    } catch (error) {
        console.error('Error during Facebook OAuth:', error);
        return done(error, false);
    }
}));


// Google Login Routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// Google OAuth Callback
app.get('/api/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    if (!req.user) {
        return res.redirect('http://localhost:4200/login?error=authentication_failed');
    }

    // Redirect to frontend with token
    const token = req.user.token;
    res.redirect(`http://localhost:4200/home`);
});



// Facebook Login Routes
app.get('/api/auth/facebook', passport.authenticate('facebook'));
app.get('/api/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.json(req.user);
});


// User Registration with Email Verification
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, phone, password, confirmPassword } = req.body;
        // Input Validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Password matching check
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Check if the user already exists
        const userDoc = await usersCollection.where('email', '==', email).get();
        if (!userDoc.empty) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create user document with verified: false
        const newUserRef = usersCollection.doc();
        await newUserRef.set({
            name,
            email,
            phone,
            password: hashedPassword,
            verified: false, // Mark as unverified
            createdAt: new Date().toISOString()
        });
        // Generate verification token
        const verificationToken = jwt.sign({ userId: newUserRef.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        // Send verification email
        const msg = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject: 'Verify Your Email',
            text: `Click the following link to verify your email: http://localhost:3000/api/auth/verify-email?token=${verificationToken}`,
            html: `Click the following link to verify your email: <a href="http://localhost:3000/api/auth/verify-email?token=${verificationToken}">Verify Email</a>`
        };
        await sgMail.send(msg);
        res.status(201).json({ message: 'User created successfully. Please check your email to verify your account.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Verify Email
app.get('/api/auth/verify-email', async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        // Update the user's verified status
        const userDoc = await usersCollection.doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userData = userDoc.data();
        if (userData.verified) {
            return res.json({ message: 'Account already verified' });
        }
        await usersCollection.doc(userId).update({ verified: true });
        // Redirect to login page
        res.redirect('http://localhost:4200/');
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

// Resend Verification Email
app.post('/api/auth/resend-verification', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const userQuery = await usersCollection.where('email', '==', email).get();
        if (userQuery.empty) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = userQuery.docs[0].data();
        if (user.verified) {
            return res.json({ message: 'Account already verified' });
        }
        const verificationToken = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const msg = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject: 'Resend Verification Email',
            text: `Click the following link to verify your email: http://localhost:3000/api/auth/verify-email?token=${verificationToken}`,
            html: `Click the following link to verify your email: <a href="http://localhost:3000/api/auth/verify-email?token=${verificationToken}">Verify Email</a>`
        };
        await sgMail.send(msg);
        res.json({ message: 'Verification email resent' });
    } catch (error) {
        console.error('Error resending verification email:', error);
        res.status(500).json({ message: 'Failed to resend verification email' });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Input Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const userQuery = await usersCollection.where('email', '==', email).get();
        if (userQuery.empty) {
            return res.status(400).json({ message: 'Cannot find user' });
        }
        const userDoc = userQuery.docs[0];
        const user = userDoc.data();
        if (!user.verified) {
            return res.status(401).json({ message: 'Please verify your email before logging in' });
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: userDoc.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user: { username: user.username, email: user.email, name: user.name } });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        // Input Validation
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const userQuery = await usersCollection.where('email', '==', email).get();
        if (userQuery.empty) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userDoc = userQuery.docs[0];
        const userId = userDoc.id;

        const resetToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const resetTokenExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

        // Update the user document with the reset token and expiration
        await usersCollection.doc(userId).update({
            resetToken,
            resetTokenExpiration
        });

        // Send email with reset link using SendGrid
        const msg = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject: 'Password Reset Request',
            text: `Click the following link to reset your password: http://localhost:3000/api/auth/reset-password?token=${resetToken}`,
            html: `Click the following link to reset your password: <a href="http://localhost:3000/api/auth/reset-password?token=${resetToken}">Reset Password</a>`
        };
        await sgMail.send(msg);
        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ message: 'Failed to send password reset email' });
    }
});

app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;
        // Input Validation
        if (!token || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Password Matching Check
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Verify the Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Get the User Document
        const userDoc = await usersCollection.doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = userDoc.data();

        // Validate the Token
        if (!user.resetToken || user.resetToken !== token || new Date(user.resetTokenExpiration) < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the New Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the User Password and Remove Reset Token
        await usersCollection.doc(userId).update({
            password: hashedPassword,
            resetToken: firestore.FieldValue.delete(),
            resetTokenExpiration: firestore.FieldValue.delete()
        });

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Example route
router.get('/', (req, res) => {
    res.send('Auth route is working!');
  });

  module.exports = router;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});