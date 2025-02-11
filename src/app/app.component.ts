import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ClientformComponent } from './components/clientform/clientform.component';

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
export class AppComponent {
  title = 'trivaj';


  activeSection: string = 'home'; // Set default section to 'home'

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
