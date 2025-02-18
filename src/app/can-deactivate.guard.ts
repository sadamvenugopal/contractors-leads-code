import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginSignupService } from './services/login-signup.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<HomeComponent> {
  constructor(private authService: LoginSignupService) {}

  canDeactivate(): boolean {
    return this.authService.isLoggedIn(); // Prevent back navigation if logged in
  }
}
