import { Injectable, NgZone } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from '@angular/fire/firestore';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MockupService {
  private firestore = getFirestore();
  private auth = getAuth();
  private collectionName = 'mockup';

  constructor(private ngZone: NgZone) {}

  // Send OTP via email
  sendOTP(email: string): Observable<any> {
    console.log('sendOTP called with email:', email);
    return new Observable((observer) => {
      const actionCodeSettings = {
        url: 'http://localhost:4200', // Default to the homepage if you don't have a specific page
        handleCodeInApp: true,
      };

      this.ngZone.run(() => {
        sendSignInLinkToEmail(this.auth, email, actionCodeSettings)
          .then(() => {
            console.log('OTP sent successfully');
            localStorage.setItem('emailForSignIn', email);
            observer.next({ success: true });
            observer.complete();
          })
          .catch((error) => {
            console.error('Error sending OTP:', error);
            observer.error(error);
          });
      });
    });
  }

  // Verify OTP
  verifyOTP(otp: string): Observable<any> {
    const email = localStorage.getItem('emailForSignIn');
    console.log('Verifying OTP for email:', email);
    return new Observable((observer) => {
      if (isSignInWithEmailLink(this.auth, otp)) {
        this.ngZone.run(() => {
          signInWithEmailLink(this.auth, email!, otp)
            .then(() => {
              console.log('OTP verified successfully');
              observer.next({ success: true });
              observer.complete();
            })
            .catch((error) => {
              console.error('Error verifying OTP:', error);
              observer.error(error);
            });
        });
      } else {
        console.error('Invalid OTP');
        observer.error('Invalid OTP');
      }
    });
  }

  // Add mockup form data to Firestore
  addMockupForm(data: any): Observable<any> {
    console.log('Adding mockup form data:', data);
    return from(addDoc(collection(this.firestore, this.collectionName), data));
  }

  // Get all mockup entries
  getMockupForms(): Observable<any[]> {
    console.log('Fetching mockup forms');
    const q = query(collection(this.firestore, this.collectionName), orderBy('timestamp', 'desc'));
    return from(getDocs(q)).pipe(map((querySnapshot) => querySnapshot.docs.map((doc: any) => doc.data())));
  }
}
