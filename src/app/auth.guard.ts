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
      return true;
    } else {
      console.warn("AuthGuard - User not authenticated, redirecting...");
      this.router.navigate(['/']);
      return false;
    }
  }
  
  
}
