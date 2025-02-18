import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';
export interface AuthResponse {
  token: string;
  user?: any; // Optional, in case you return user details
}
@Injectable({ providedIn: 'root' })
export class LoginSignupService {
  private apiUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  signUp(data: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/register`, data).toPromise();
  }

  login(data: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        this.setToken(response.token);
        this.router.navigate(['/home']).then(() => {
          this.location.replaceState('/home'); // Removes the previous login page from history
        });
      })
    );
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
     return this.http.post<AuthResponse>(`${this.apiUrl}/auth/google`, {});

}

// googleLogin(): Observable<AuthResponse> {
//   return this.http.post<AuthResponse>(`${this.apiUrl}/auth/google`, {});
// }

// facebookLogin(): Observable<AuthResponse> {
//   return this.http.post<AuthResponse>(`${this.apiUrl}/auth/facebook`, {});
// }
handleGoogleCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    this.setToken(token);
    this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
      // Remove the token from the URL after login
      this.location.replaceState('/home');
    });
  }
}



  facebookLogin() {
    window.location.href = `${this.apiUrl}/facebook`;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']).then(() => {
      window.location.reload(); // Ensure user is redirected after logout
    });
  }

  public setToken(token: string) {
    localStorage.setItem('authToken', token);
  }
}