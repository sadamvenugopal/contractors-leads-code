const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
require('dotenv').config();
const cors = require('cors');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount) // ✅ Firebase Firestore Initialized
});

const firestore = admin.firestore();
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors()); // ✅ Allows frontend requests during local testing

// ✅ Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback' // ✅ Updated for Local Testing
}, async (accessToken, refreshToken, profile, done) => {
    console.log("✅ Google Profile:", profile); // ✅ Debugging Log
    try {
        const user = await saveUserToFirestore(profile, 'google');
        return done(null, user);
    } catch (error) {
        console.error("❌ Google Auth Error:", error);
        return done(error, null);
    }
}));

// ✅ Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
    console.log("✅ Facebook Profile:", profile); // ✅ Debugging Log
    try {
        const user = await saveUserToFirestore(profile, 'facebook');
        return done(null, user);
    } catch (error) {
        console.error("❌ Facebook Auth Error:", error);
        return done(error, null);
    }
}));

// ✅ OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), handleOAuthCallback);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), handleOAuthCallback);

async function handleOAuthCallback(req, res) {
    if (!req.user) {
        console.error("❌ OAuth Callback Error: User not authenticated");
        return res.status(401).json({ msg: "Authentication failed" });
    }
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("✅ JWT Token:", token); // ✅ Debugging Log
    res.redirect(`http://localhost:4200/login?token=${token}`);
}

// ✅ User Registration (Email/Password)
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
    }
    try {
        const userSnapshot = await firestore.collection('users').doc(email).get();
        if (userSnapshot.exists) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { name, email, password: hashedPassword, createdAt: new Date(), provider: 'local' };
        await firestore.collection('users').doc(email).set(userData);
        const token = jwt.sign({ user: userData }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: userData });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

// ✅ User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
    }
    try {
        const userSnapshot = await firestore.collection('users').doc(email).get();
        if (!userSnapshot.exists) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const userData = userSnapshot.data();
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ user: userData }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: userData });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// ✅ Save User to Firestore
async function saveUserToFirestore(profile, provider) {
    try {
        const email = profile.emails?.[0]?.value || '';
        if (!email) throw new Error("Email not provided by provider");
        const userSnapshot = await firestore.collection('users').doc(email).get();
        let userData;
        if (!userSnapshot.exists) {
            userData = { uid: profile.id, name: profile.displayName || 'Unknown', email, lastLogin: new Date(), provider };
            await firestore.collection('users').doc(email).set(userData);
        } else {
            userData = userSnapshot.data();
            userData.lastLogin = new Date();
            await firestore.collection('users').doc(email).update({ lastLogin: userData.lastLogin });
        }
        return userData;
    } catch (error) {
        console.error('❌ Firestore Save Error:', error);
        throw error;
    }
}

// ✅ API Test Route
router.get('/test', (req, res) => {
    res.status(200).json({ msg: "API is working locally!" });
});

module.exports = router;
