import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
  user?: any; // Optional, in case you return user details
}

@Injectable({ providedIn: 'root' })
export class LoginSignupService {
  private apiUrl = 'http://localhost:3001/api/auth';
  // private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  signUp(data: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/register`, data).toPromise();
  }

  login(data: any): Observable<any> {
    return this.http.post<{ token: string; user: { name: string; email: string } }>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUser(response.user); // Store user data
        this.router.navigate(['/home']).then(() => {
          window.history.pushState(null, '', '/home'); // Override browser history
        });
      })
    );
  }

  // Store user details in localStorage
  public setUser(user: { name: string; email: string }) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  resetPassword(email: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }).toPromise();
  }

  resetPasswordWithToken(token: string, newPassword: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword }).toPromise();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  googleLogin() {
    window.location.href = `${this.apiUrl}/google`; // Fix the URL formatting
  }

  handleGoogleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name') || '';
    const email = urlParams.get('email') || '';
    console.log("Extracted token:", token);
  
    if (token) {
      this.setToken(token);
      this.setUser({ name, email });
      console.log("Stored authToken:", this.getToken());
  
      this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
        this.location.replaceState('/home');
      });
    } else {
      console.error("No token found in URL, redirecting to home.");
      this.router.navigate(['/']);  // Redirect to home if no token
    }
  }
  

  facebookLogin() {
    window.location.href = `${this.apiUrl}/facebook`;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      return false;
    }
  
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = tokenPayload.exp * 1000; // Convert to milliseconds
  
      // 🛑 Ignore reset-password token
      const currentUrl = window.location.href;
      if (currentUrl.includes('/reset-password')) {
        console.warn("Auth Service - Reset password mode detected, ignoring login state.");
        return false;
      }
  
      if (Date.now() >= expiryTime) {
        console.warn("Auth Service - Token expired.");
        this.logout();
        return false;
      }
  
      return true;
    } catch (e) {
      console.error("Auth Service - Invalid token format.", e);
      return false;
    }
  }
  
  storeToken(token: string): void {
    const currentUrl = window.location.href;
  
    // 🛑 Prevent storing reset password token
    if (currentUrl.includes('/reset-password')) {
      console.warn("Auth Service - Ignoring token storage for reset-password.");
      return;
    }
  
    localStorage.setItem('authToken', token);
    console.log("Auth Service - Stored Token in LocalStorage:", token);
  }
  

 
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); // Remove user details
    this.router.navigate(['/']).then(() => {
      window.location.reload(); // Ensure the UI updates
    });
  }
  
  

  // Get user details
  getUser(): { name: string; email: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  public setToken(token: string) {
    console.log("Setting authToken:", token); // Debugging token storage
    localStorage.setItem('authToken', token);
  }
}