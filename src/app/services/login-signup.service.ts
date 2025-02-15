import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  signUp(name: string, email: string, phone: string, password: string,): Promise<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, phone, password, }).toPromise();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  resetPassword(email: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }).toPromise();
  }

  resetPasswordWithToken(token: string, newPassword: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword, confirmPassword: newPassword }).toPromise();
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  googleLogin() {
    window.location.href = `${this.apiUrl}/google`;
  }

  facebookLogin() {
    window.location.href = `${this.apiUrl}/facebook`;
  }
}