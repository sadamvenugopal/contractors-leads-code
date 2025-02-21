import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginSignupService } from '../../services/login-signup.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginSignupComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  signUpForm: FormGroup;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';

  isSignUpFormVisible = true;
  isLoginFormVisible = false;
  isForgotPasswordFormVisible = false;
  isResetPasswordFormVisible = false;

  resetToken: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginSignupService: LoginSignupService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginSignupService.handleGoogleCallback(); // Check for Google login callback token
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  closeForm() {
    this.isVisible = false;
    this.close.emit();
  }

  async submitSignUpForm() {
    this.clearMessages();
    if (this.signUpForm.invalid) {
      this.showErrorMessage('Please fill out all required fields correctly.');
      return;
    }
    try {
      await this.loginSignupService.signUp(this.signUpForm.value);
      this.showSuccessMessage('Sign up successful! Please check your email to verify your account.');
      this.openLoginForm();
    } catch (error) {
      this.showErrorMessage(this.extractErrorMessage(error) || 'Sign up failed. Please try again.');
    }
  }

  async submitLoginForm() {
    this.clearMessages();
    if (this.loginForm.invalid) {
      this.showErrorMessage('Please enter a valid email and password.');
      return;
    }
    try {
      const response = await this.loginSignupService.login(this.loginForm.value).toPromise();
      this.loginSignupService.setToken(response.token);
      this.showSuccessMessage('Login successful!');
      this.closeForm();
    } catch (error) {
      this.showErrorMessage(this.extractErrorMessage(error) || 'Login failed. Check your credentials.');
    }
  }

  async submitForgotPasswordForm() {
    this.clearMessages();
    if (this.forgotPasswordForm.invalid) {
      this.showErrorMessage('Please enter a valid email.');
      return;
    }
    try {
      await this.loginSignupService.resetPassword(this.forgotPasswordForm.value.email);
      this.showSuccessMessage('Password reset email sent!');
    } catch (error) {
      this.showErrorMessage(this.extractErrorMessage(error) || 'Error sending reset email.');
    }
  }

  async submitResetPasswordForm() {
    this.clearMessages();
    if (this.resetPasswordForm.invalid || !this.resetToken) {
      this.showErrorMessage('Please fill in all required fields correctly.');
      return;
    }
    try {
      await this.loginSignupService.resetPasswordWithToken(this.resetToken, this.resetPasswordForm.value.newPassword);
      this.showSuccessMessage('Password reset successfully! Please log in with your new password.');
      this.openLoginForm();
    } catch (error) {
      this.showErrorMessage(this.extractErrorMessage(error) || 'Password reset failed. Please try again.');
    }
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  extractErrorMessage(error: any): string {
    if (error?.error?.message) {
      return error.error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return '';
    }
  }

  closeModal() {
    this.isSignUpFormVisible = false;
    this.isLoginFormVisible = false;
    this.isForgotPasswordFormVisible = false;
    this.isResetPasswordFormVisible = false;
    this.close.emit();
  }

  openLoginForm() {
    this.isSignUpFormVisible = false;
    this.isLoginFormVisible = true;
    this.isForgotPasswordFormVisible = false;
    this.isResetPasswordFormVisible = false;
  }

  openSignUpForm() {
    this.isSignUpFormVisible = true;
    this.isLoginFormVisible = false;
    this.isForgotPasswordFormVisible = false;
    this.isResetPasswordFormVisible = false;
  }

  openForgotPasswordForm() {
    this.isSignUpFormVisible = false;
    this.isLoginFormVisible = false;
    this.isForgotPasswordFormVisible = true;
    this.isResetPasswordFormVisible = false;
  }

  openResetPasswordForm(token: string) {
    this.resetToken = token;
    this.isSignUpFormVisible = false;
    this.isLoginFormVisible = false;
    this.isForgotPasswordFormVisible = false;
    this.isResetPasswordFormVisible = true;
  }

  googleLogin() {
    try {
      this.loginSignupService.googleLogin();
      this.showSuccessMessage('Google login successful!');
    } catch (error) {
      console.error('Google login error:', error);
    }
  }

  facebookLogin() {
    try {
      this.loginSignupService.facebookLogin();
      this.showSuccessMessage('Facebook login successful!');
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  }



  showSuccessMessage(message: string) {
    window.alert(message); // Use plain alert for success messages
  }

  showErrorMessage(message: string) {
    window.alert(message); // Use plain alert for error messages
  }
}