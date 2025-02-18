import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class FinalFormService {
  private apiUrl = 'http://localhost:3000/submit-finalform'; // Replace with your backend URL if deployed

  constructor(private http: HttpClient) {}

  submitFinalForm(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}