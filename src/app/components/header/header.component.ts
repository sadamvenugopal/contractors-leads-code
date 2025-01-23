import { Component, HostListener } from '@angular/core';
import { PricingComponent } from '../pricing/pricing.component';  // Import PricingComponent
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf and ngFor
import { GalleryComponent } from '../gallery/gallery.component';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CommonModule,
    PricingComponent,// Add pricingComponent 
    LoginSignupComponent,
    FooterComponent,
    GalleryComponent
    
  ],  
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isMockupFormVisible: boolean = false;  // Add this line to initialize the variable
  windowWidth: number = window.innerWidth;
  isSignUpFormVisible: boolean = false;




  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
  }

   // Define services array
  services = [
    { icon: 'icon1.png', title: 'Service 1', description: 'Description for Service 1 goes here.' },
    { icon: 'icon2.png', title: 'Service 2', description: 'Description for Service 2 goes here.' },
    { icon: 'icon3.png', title: 'Service 3', description: 'Description for Service 3 goes here.' },
    { icon: 'icon4.png', title: 'Service 4', description: 'Description for Service 4 goes here.' }
  ];

  // Toggle the menu and overlay visibility
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const hamburgerElement = document.querySelector('.hamburger');
    if (hamburgerElement) {
      if (this.isMenuOpen) {
        hamburgerElement.classList.add('active');
      } else {
        hamburgerElement.classList.remove('active');
      }
    }
  }

  // Close the menu and overlay
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Scroll to the specific section and close menu
  navigateToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu(); // Close the menu when a section is selected
    }
  }

  // togglePricing() {
  //   // Scroll to the pricing section when the Business button is clicked
  //   const pricingSection = document.getElementById('pricing');
  //   if (pricingSection) {
  //     pricingSection.scrollIntoView({ behavior: 'smooth' });
  //     this.closeMenu(); // Close the menu
  //   }
  // }

  // Open the mockup form and close the menu
  openMockupFormAndCloseMenu() {
    this.isMockupFormVisible = true;  // Open the mockup form
    this.closeMenu();  // Close the menu
  }

  // Close the mockup form
  closeMockupForm() {
    this.isMockupFormVisible = false;
  }

  submitMockupForm(event: Event) {


  }

   // Open the sign-up form and close the menu (if applicable)
   openSignUpFormAndCloseMenu() {
    this.isSignUpFormVisible = true; // Show the sign-up modal
    // Close the menu if it exists (add logic here if needed)
  }

  // Close the sign-up form/modal
  closeSignUpForm() {
    this.isSignUpFormVisible = false; // Hide the sign-up modal
  }
}