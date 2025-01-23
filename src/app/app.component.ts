import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports:
   [
    RouterOutlet, 
    HeaderComponent,// Import AppHeaderComponent
    CommonModule
  ], 

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trivaj';


  activeSection: string = 'home'; // Set default section to 'home'

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
