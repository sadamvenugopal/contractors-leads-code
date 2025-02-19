import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginSignupService } from './services/login-signup.service';

@Component({
  selector: 'app-root',
  imports:
   [
    RouterOutlet, 
    CommonModule
  ], 

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'trivaj';


  activeSection: string = 'home'; // Set default section to 'home'
  constructor(private authService: LoginSignupService) {}

  setActiveSection(section: string) {
    this.activeSection = section;
  }



  ngOnInit() {

    this.authService.handleGoogleCallback();

  }

}
