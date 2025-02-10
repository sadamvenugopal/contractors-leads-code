import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientformService {

  private apiUrl = 'http://localhost:3000/submit-clientform'; // Replace with your backend URL if deployed

  constructor(private http: HttpClient) {}

  submitClientForm(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
