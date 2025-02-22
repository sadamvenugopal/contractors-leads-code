import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSignupService } from '../../services/login-signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true, // ✅ Added standalone declaration
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  token: string | null = null; // ✅ Removed resetToken (duplicate)

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginSignupService: LoginSignupService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token'); // ✅ Extract token correctly

    console.log("ResetPasswordComponent - Extracted Token:", this.token);

    if (!this.token) {
      console.warn("ResetPasswordComponent - No token found, redirecting.");
      this.router.navigate(['/login']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  async submitResetPasswordForm() {
    this.clearMessages();
    if (this.resetPasswordForm.invalid || !this.token) {
      this.showErrorMessage('Please fill in all required fields correctly.');
      return;
    }
    try {
      await this.loginSignupService.resetPasswordWithToken(this.token, this.resetPasswordForm.value.newPassword);
      this.showSuccessMessage('Password reset successfully! Redirecting...');
      setTimeout(() => this.router.navigate(['/']), 3000); // ✅ Redirects to home or dashboard
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

  showSuccessMessage(message: string) {
    window.alert(message);
  }

  showErrorMessage(message: string) {
    window.alert(message);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  closeModal() {
    this.router.navigate(['/']);
  }
  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
