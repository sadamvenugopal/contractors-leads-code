import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminNotificationService {
  private backendBaseUrl = 'http://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  /**
   * Notify admin about a new form submission.
   */
  notifyAdmin(formData: any): Observable<any> {
    const url = `${this.backendBaseUrl}/submit-form`;
    return this.http.post(url, formData).pipe(
      map((response) => {
        console.log('Admin notification sent successfully:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error sending admin notification:', error);
        throw error;
      })
    );
  }
}