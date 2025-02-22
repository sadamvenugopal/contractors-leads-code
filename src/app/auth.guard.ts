import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginSignupService } from './services/login-signup.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginSignupService, private router: Router) {}

  canActivate(): boolean {
    const loggedIn = this.authService.isLoggedIn();
    console.log("AuthGuard - User logged in:", loggedIn);
  
    if (loggedIn) {
      console.log("AuthGuard - User authenticated, access granted.");
      return true;
    } else {
      console.warn("AuthGuard - User not authenticated, redirecting to reset-password.");
      this.router.navigate(['/reset-password']); // Redirects to reset-password
      return false;
    }
  }
  
}
