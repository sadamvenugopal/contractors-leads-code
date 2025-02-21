import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginSignupService } from '../../services/login-signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  imports: [CommonModule],
})
export class LoginSignupComponent {
  @Output() close = new EventEmitter<void>();

  signUpForm: FormGroup;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  isSignUpFormVisible = true;
  isLoginFormVisible = false;
  isForgotPasswordFormVisible = false;

  constructor(
    private fb: FormBuilder,
    private loginSignupService: LoginSignupService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async submitSignUpForm() {
    if (this.signUpForm.invalid) return;
    const { name, email, password, confirmPassword } = this.signUpForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await this.loginSignupService.signUp(name, email, password);
      alert('Sign-up successful! 🎉');
    } catch (error) {
      console.error('Sign-up error:', error);
      alert('Sign-up failed. Please try again.');
    }
  }

  async submitLoginForm() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.loginSignupService.login(email, password).subscribe(
      (response: any) => {
        if (response && response.token) {
          this.loginSignupService.setToken(response.token);
          alert('Login successful!');
        } else {
          alert('Login failed. No token received.');
        }
      },
      (error: any) => {
        console.error('Login error:', error);
        alert('Login failed. Check your credentials.');
      }
    );
  }

  async submitForgotPasswordForm() {
    if (this.forgotPasswordForm.invalid) return;
    const { email } = this.forgotPasswordForm.value;
    try {
      await this.loginSignupService.resetPassword(email);
      alert('Password reset email sent!');
    } catch (error) {
      console.error('Reset password error:', error);
      alert('Error sending reset email.');
    }
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

  googleLogin() {
    this.loginSignupService.googleLogin();
  }

  facebookLogin() {
    this.loginSignupService.facebookLogin();
  }
}