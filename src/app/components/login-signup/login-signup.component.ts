import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  imports: [CommonModule]
})
export class LoginSignupComponent {
  @Output() close = new EventEmitter<void>();


  isSignUpFormVisible: boolean = true;  // Initialize with Sign-Up form visible
  isLoginFormVisible: boolean = false;  // Initially hide Login form
  isForgotPasswordFormVisible: boolean = false;  // Initially hide Forgot Password form

  isSubmissionInProgress: boolean = false;


  openSignUpFormAndCloseMenu() {
    this.isSignUpFormVisible = true;
    this.isLoginFormVisible = false;  // Hide Login form
    this.isForgotPasswordFormVisible = false;  // Hide Forgot Password form
  }

  openLoginFormAndCloseMenu() {
    this.isLoginFormVisible = true;
    this.isSignUpFormVisible = false;  // Hide Sign-Up form
    this.isForgotPasswordFormVisible = false;  // Hide Forgot Password form
  }

  openForgotPasswordForm() {
    this.isForgotPasswordFormVisible = true;
    this.isSignUpFormVisible = false;  // Hide Sign-Up form
    this.isLoginFormVisible = false;  // Hide Login form
  }

  closeModal() {
    this.isSignUpFormVisible = false;
    this.isLoginFormVisible = false;
    this.isForgotPasswordFormVisible = false; // Close Forgot Password form as well
    this.close.emit();
  }

  submitForgotPasswordForm(event: Event) {
    event.preventDefault();
    console.log('Forgot Password form submitted!');
    this.closeModal();
  }

  submitSignUpForm(event: Event) {
    event.preventDefault();
    console.log('Sign-Up form submitted!');
    this.closeModal();
  }

  submitLoginForm(event: Event) {
    event.preventDefault();
    console.log('Login form submitted!');
    this.closeModal();
  }

  // Placeholder for social login methods
  facebookSignIn() {}
  googleSignIn() {}
}