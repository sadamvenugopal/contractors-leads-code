import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule for router-outlet
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MockupService } from './services/mockup.service';
import { LoginSignupService } from './services/login-signup.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent // Declare HeaderComponent here
  ],
  imports: [
    BrowserModule,
    CommonModule, // Import CommonModule for common directives like *ngIf, *ngFor
    FormsModule,
    ReactiveFormsModule,
    RouterModule, // Import RouterModule for router-outlet
    
  ],
  providers: [MockupService, LoginSignupService],
  bootstrap: [AppComponent]
})
export class AppModule {}
