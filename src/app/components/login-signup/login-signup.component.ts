import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginSignupService } from '../../services/login-signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  imports: [CommonModule,ReactiveFormsModule],
})
export class LoginSignupComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  signUpForm: FormGroup;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  errorMessage: string = ''; // <-- Add this line to define the error message property
  isSignUpFormVisible = true;
  isLoginFormVisible = false;
  isForgotPasswordFormVisible = false;
  isResetPasswordFormVisible = false;
  resetToken: string | null = null;

  constructor(private fb: FormBuilder, private loginSignupService: LoginSignupService) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
    

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

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  closeForm() {
    this.isVisible = false;
    this.close.emit();
  }

  async submitSignUpForm() {
    if (this.signUpForm.valid) {
      try {
        await this.loginSignupService.signUp(this.signUpForm.value);
        alert('Sign up successful!');
        this.openLoginForm();
      } catch (error) {
        console.error('Sign up error:', error);
        alert('User already exist!');
        this.errorMessage = 'Sign up failed. Please try again.';
      }
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  async submitLoginForm() {
    if (this.loginForm.invalid) return;
    try {
      const response = await this.loginSignupService.login(this.loginForm.value).toPromise();
      this.loginSignupService.setToken(response.token);
      alert('Login successful!');
      this.closeForm();
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Check your credentials.');
    }
  }


  async submitForgotPasswordForm() {
    if (this.forgotPasswordForm.invalid) return;
    try {
      await this.loginSignupService.resetPassword(this.forgotPasswordForm.value.email);
      alert('Password reset email sent!');
    } catch (error) {
      console.error('Reset password error:', error);
      alert('Error sending reset email.');
    }
  }

  async submitResetPasswordForm() {
    if (this.resetPasswordForm.invalid || !this.resetToken) return;
    try {
      await this.loginSignupService.resetPasswordWithToken(this.resetToken, this.resetPasswordForm.value.newPassword);
      alert('Password reset successfully!');
      this.openLoginForm();
    } catch (error) {
      console.error('Reset password with token error:', error);
      alert('Password reset failed. Please try again.');
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
    this.loginSignupService.googleLogin();
  }

  facebookLogin() {
    this.loginSignupService.facebookLogin();
  }
}
