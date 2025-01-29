import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginSignupService } from '../../services/login-signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  imports :[CommonModule]
})
export class LoginSignupComponent {
  @Output() close = new EventEmitter<void>();

  signUpForm: FormGroup;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;

  isSignUpFormVisible = true;
  isLoginFormVisible = false;
  isForgotPasswordFormVisible = false;

  constructor(private fb: FormBuilder, private loginSignupService: LoginSignupService) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitSignUpForm() {
    if (this.signUpForm.invalid) {
      console.log('Form is invalid');
      return;
    }
  
    const { name, email, password, confirmPassword } = this.signUpForm.value;
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    console.log('Submitting sign-up form', { name, email, password });
  
    this.loginSignupService.signUp(name, email, password)
      .then(() => {
        console.log('Sign-up successful!');
        alert('Sign-up successful! 🎉');
      })
      .catch((error) => {
        console.error('Sign-up failed:', error);
        alert('Sign-up failed. Please try again.');
      });
  }
  
  

  submitLoginForm() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;

    this.loginSignupService.login(email, password)
      .then(() => alert('Login successful!'))
      .catch(() => alert('Login failed. Check your credentials.'));
  }

  submitForgotPasswordForm() {
    if (this.forgotPasswordForm.invalid) return;
    const { email } = this.forgotPasswordForm.value;

    this.loginSignupService.resetPassword(email)
      .then(() => alert('Password reset email sent!'))
      .catch(() => alert('Error sending reset email.'));
  }

  googleSignIn() {
    this.loginSignupService.googleSignIn()
      .then(() => alert('Google login successful!'))
      .catch(() => alert('Google login failed. Please try again.'));
  }

  closeModal() {
    this.isSignUpFormVisible = false;
    this.isLoginFormVisible = false;
    this.isForgotPasswordFormVisible = false;
    this.close.emit();
  }

  openLoginForm() {
    this.isSignUpFormVisible = false;
    this.isLoginFormVisible = true;
    this.isForgotPasswordFormVisible = false;
  }

  openSignUpForm() {
    this.isSignUpFormVisible = true;
    this.isLoginFormVisible = false;
    this.isForgotPasswordFormVisible = false;
  }

  openForgotPasswordForm() {
    this.isSignUpFormVisible = false;
    this.isLoginFormVisible = false;
    this.isForgotPasswordFormVisible = true;
  }
}
