import { Component, HostListener, inject } from '@angular/core';
import { PricingComponent } from '../pricing/pricing.component';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from '../gallery/gallery.component';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { FooterComponent } from '../footer/footer.component';
import { MockupService } from '../../services/mockup.service';
import { AdminNotificationService } from '../../services/admin-notification.service'; // Import the notification service

import emailjs from 'emailjs-com';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CommonModule,
    PricingComponent,
    LoginSignupComponent,
    FooterComponent,
    GalleryComponent,
  ],
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isMockupFormVisible: boolean = false;
  isSignUpFormVisible: boolean = false;
  isOTPVisible: boolean = false;  // Define isOTPVisible property
  enteredOTP: string = '';  // Define enteredOTP property
  windowWidth: number = window.innerWidth;




  services = [
    { icon: 'icon1.png', title: 'Service 1', description: 'Description for Service 1.' },
    { icon: 'icon2.png', title: 'Service 2', description: 'Description for Service 2.' },
    { icon: 'icon3.png', title: 'Service 3', description: 'Description for Service 3.' },
    { icon: 'icon4.png', title: 'Service 4', description: 'Description for Service 4.' },
  ];

  countries = [
    { code: '+91', name: 'India' },
    { code: '+1', name: 'USA' },
    // Add more countries as needed
  ];
  constructor(
    private mockupService: MockupService,
    private adminNotificationService: AdminNotificationService // Inject notification service
  ) {}
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const hamburgerElement = document.querySelector('.hamburger');
    hamburgerElement?.classList.toggle('active', this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;
    const hamburgerElement = document.querySelector('.hamburger');
    hamburgerElement?.classList.remove('active');
  }

  navigateToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu();
    }
  }

  openMockupFormAndCloseMenu() {
    this.isMockupFormVisible = true;
    this.closeMenu();
  }

  closeMockupForm() {
    this.isMockupFormVisible = false;
  }

  openSignUpFormAndCloseMenu() {
    this.isSignUpFormVisible = true;
    this.closeMenu();
  }

  closeSignUpForm() {
    this.isSignUpFormVisible = false;
  }

  // Form submission
  submitMockupForm(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = {
      from_name: (target.querySelector('#name') as HTMLInputElement)?.value || '',
      from_email: (target.querySelector('#email') as HTMLInputElement)?.value || '',
      phone: (target.querySelector('#phone') as HTMLInputElement)?.value || '',
      description: (target.querySelector('#description') as HTMLTextAreaElement)?.value || '',
    };

    if (!this.validateForm(formData)) {
      return;
    }

    // Send OTP to user email
    this.mockupService.sendOTP(formData.from_email).subscribe({
      next: (response) => {
        console.log('OTP sent to user email!', response);
        alert('OTP sent to your email! Please check your inbox.');
        this.openOTPVerificationForm();
      },
      error: (error) => {
        console.error('Error sending OTP:', error);
      }
    });

    // Save data to Firestore for admin notification
    this.mockupService.addMockupForm(formData).subscribe({
      next: () => {
        console.log('Form submitted to Firestore!');
        
        // Send admin notification
        this.adminNotificationService.sendAdminNotification(formData.from_name); // Send admin notification
      },
      error: (error) => {
        console.error('Error submitting form:', error);
      }
    });
  }
  
  openOTPVerificationForm() {
    this.isOTPVisible = true; // Toggle OTP form visibility
  }

  verifyOTP() {
    if (this.enteredOTP) {
      this.mockupService.verifyOTP(this.enteredOTP).subscribe({
        next: (response) => {
          alert('OTP Verified! Submission successful.');
          this.closeMockupForm();
        },
        error: (error) => {
          alert('Invalid OTP. Please try again.');
          console.error(error);
        }
      });
    } else {
      alert('Please enter the OTP.');
    }
  }
  

  private validateForm(formData: { from_name: string; from_email: string; phone: string; description: string }): boolean {
    const nameRegex = /^[a-zA-Z]{3,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;  // Corrected the email regex
    const phoneRegex = /^(\+91)?\d{10,15}$/;

    const descriptionWordCount = this.countWords(formData.description);

    // Validate Name
    if (!nameRegex.test(formData.from_name)) {
      alert('Name must contain only letters and be between 3 and 30 characters.');
      return false;
    }

    // Validate Email
    if (!emailRegex.test(formData.from_email)) {
      alert('Email must be a valid Gmail address.');
      return false;
    }

    // Validate Phone
    if (!phoneRegex.test(formData.phone)) {
      alert('Phone number must be 10 to 15 digits long and may include country code.');
      return false;
    }

    // Validate Description
    if (descriptionWordCount < 20 || descriptionWordCount > 100) {
      alert('Description must contain between 20 and 100 words.');
      return false;
    }

    return true;
  }

  private countWords(input: string): number {
    return input.trim().split(/\s+/).length;
  }
}
