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

  constructor(private fb: FormBuilder, private loginSignupService: LoginSignupService,private router: Router) {
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
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }
    try {
      await this.loginSignupService.signUp(this.signUpForm.value);
      this.successMessage = 'Sign up successful! Please check your email to verify your account.';
      
      // Show an alert box
      window.alert(this.successMessage);
  
      this.openLoginForm();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error) || 'Sign up failed. Please try again.';
      
      // Optional: Show an error alert
      window.alert(this.errorMessage);
    }
  }
  

  async submitLoginForm() {
    this.clearMessages();
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }
    try {
      const response = await this.loginSignupService.login(this.loginForm.value).toPromise();
      this.loginSignupService.setToken(response.token);
      this.successMessage = 'Login successful!';
      this.closeForm();
      window.alert(this.successMessage);
      
      // Navigate to home and disable back button
      this.router.navigate(['/home']).then(() => {
        history.pushState(null, '', location.href);
        window.onpopstate = () => {
          history.pushState(null, '', location.href);
        };
      });

    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error) || 'Login failed. Check your credentials.';
      window.alert(this.errorMessage);
    }
  }


  async submitForgotPasswordForm() {
    this.clearMessages();
    if (this.forgotPasswordForm.invalid) {
      this.errorMessage = 'Please enter a valid email.';
      return;
    }
    try {
      await this.loginSignupService.resetPassword(this.forgotPasswordForm.value.email);
      this.successMessage = 'Password reset email sent!';
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error) || 'Error sending reset email.';
    }
  }

  async submitResetPasswordForm() {
    this.clearMessages();
    if (this.resetPasswordForm.invalid || !this.resetToken) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    try {
      await this.loginSignupService.resetPasswordWithToken(this.resetToken, this.resetPasswordForm.value.newPassword);
      this.successMessage = 'Password reset successfully! Please log in with your new password.';
      this.openLoginForm();
    } catch (error) {
      this.errorMessage = this.extractErrorMessage(error) || 'Password reset failed. Please try again.';
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
      window.alert('Google login successful!');
      
      // Navigate to home and disable back button
      this.router.navigate(['/home']).then(() => {
        history.pushState(null, '', location.href);
        window.onpopstate = () => {
          history.pushState(null, '', location.href);
        };
      });

    } catch (error) {
      console.error('Google login error:', error);
    }
  }


  facebookLogin() {
    try {
      this.loginSignupService.facebookLogin();
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  }
}
