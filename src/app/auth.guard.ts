import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginSignupService } from './services/login-signup.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginSignupService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Allow access if logged in
    } else {
      this.router.navigate(['/']); // Redirect to signup/login page
      return false;
    }
  }
}
