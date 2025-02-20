import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginSignupService } from './services/login-signup.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginSignupService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const loggedIn = this.authService.isLoggedIn();
    console.log("AuthGuard - User logged in:", loggedIn);

    if (loggedIn) {
      return true; // Allow access to any route if logged in
    } else {
      console.warn("AuthGuard - User not authenticated, redirecting to login.");
      return false;
    }
  }
}
