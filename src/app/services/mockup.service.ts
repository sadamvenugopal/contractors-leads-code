import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getFirestore, doc, setDoc, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class MockupService {
  private backendBaseUrl = 'http://localhost:3000'; // Replace with your backend URL

  private firestore = getFirestore();

  constructor(private http: HttpClient){}

    /**
   * Add mockup form data to the backend.(message)
   */
    addMockupForm(data: any): Observable<any> {
      const url = `${this.backendBaseUrl}/submit-form`;
      return this.http.post(url, data).pipe(
        map((response) => {
          console.log('✅ Form submitted successfully:', response);
          return response;
        }),
        catchError((error) => {
          console.error('❌ Error submitting form:', error);
          throw error;
        })
      );
    }
  

   /**
   * Verify OTP with the backend.
   */
   verifyOTP(email: string, otp: string): Observable<any> {
    const url = `${this.backendBaseUrl}/verify-otp`;
    const payload = { email, otp }; // Ensure email is passed correctly
    console.log('🔍 Sending OTP verification request:', payload); // Debugging Log
    return this.http.post(url, payload).pipe(
      map((response) => {
        console.log('✅ OTP verified successfully:', response);
        return response;
      }),
      catchError((error) => {
        console.error('❌ Error verifying OTP:', error);
        return new Observable((observer) => {
          observer.error(error);
        });
      })
    );
  }



  /**
   * Update OTP verification status in Firestore (optional).
   */
  updateOTPVerificationStatus(mockupId: string, isVerified: boolean): Observable<any> {
    console.log('🔄 Updating OTP verification status for mockup:', mockupId);
    return new Observable((observer) => {
      observer.next(true);
      observer.complete();
    });
  }



  
}


