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
    return this.http.post<{ token: string; user: { name: string; email: string } }>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUser(response.user); // Store user data
        this.router.navigate(['/home']).then(() => {
          this.location.replaceState('/home'); // Removes the previous login page from history
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

// googleLogin(): Observable<AuthResponse> {
//   return this.http.post<AuthResponse>(`${this.apiUrl}/auth/google`, {});
// }

// facebookLogin(): Observable<AuthResponse> {
//   return this.http.post<AuthResponse>(`${this.apiUrl}/auth/facebook`, {});
// }


handleGoogleCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const name = urlParams.get('name') || '';
  const email = urlParams.get('email') || '';

  console.log("Extracted token:", token); // Debugging token

  if (token) {
    this.setToken(token);
    this.setUser({ name, email });

    console.log("Stored authToken:", this.getToken()); // Debugging storage

    this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
      this.location.replaceState('/home');
    });
  } else {
    console.error("No token found in URL");
  }
}





  facebookLogin() {
    window.location.href = `${this.apiUrl}/facebook`;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    console.log("Checking authToken in isLoggedIn():", token); // Debugging token read
    return !!token; // Returns true if token exists
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