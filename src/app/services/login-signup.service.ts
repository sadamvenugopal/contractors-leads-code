import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
  private usersCollection = 'users'; // Firestore collection name

  constructor(private auth: Auth, private firestore: Firestore) {}

  async signUp(name: string, email: string, password: string): Promise<void> {
    try {
      console.log('Signing up with:', { name, email, password });
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User created:', userCredential);
      await this.saveUserToFirestore(userCredential, name);
      console.log('User saved to Firestore');
      return Promise.resolve();
    } catch (error) {
      console.error('Error signing up:', error);
      return Promise.reject(error);
    }
  }
  

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      await this.saveUserToFirestore(userCredential); // Save user details on login
      alert('Login successful! 🎉');
      console.log('User logged in successfully!');
      return userCredential;
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      alert('Password reset email sent! 📩');
      console.log('Password reset email sent!');
    } catch (error) {
      alert('Error resetting password. Please try again.');
      console.error('Error resetting password:', error);
      throw error;
    }
  }

  async googleSignIn(): Promise<UserCredential> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      await this.saveUserToFirestore(userCredential);
      alert('Google login successful! 🎉');
      console.log('User signed in with Google!');
      return userCredential;
    } catch (error) {
      alert('Google login failed. Please try again.');
      console.error('Error with Google sign-in:', error);
      throw error;
    }
  }

  async facebookSignIn(): Promise<UserCredential> {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      await this.saveUserToFirestore(userCredential);
      alert('Facebook login successful! 🎉');
      console.log('User signed in with Facebook!');
      return userCredential;
    } catch (error) {
      alert('Facebook login failed. Please try again.');
      console.error('Error with Facebook sign-in:', error);
      throw error;
    }
  }

  /**
   * Save or update user data in Firestore on sign-up and login.
   */
  private async saveUserToFirestore(userCredential: UserCredential, name?: string): Promise<void> {
    const user = userCredential.user;
    const userDocRef = doc(this.firestore, `${this.usersCollection}/${user.uid}`);
    
    const userData = {
      uid: user.uid,
      name: name || user.displayName || 'Unknown', // Use provided name, displayName, or fallback
      email: user.email,
      lastLogin: new Date() // Update last login time
    };

    await setDoc(userDocRef, userData, { merge: true });
    console.log('User saved to Firestore!');
  }
}
