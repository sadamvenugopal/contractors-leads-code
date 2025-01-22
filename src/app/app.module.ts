import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { PricingComponent } from './components/pricing/pricing.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environment';
import { AppHeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    PricingComponent,
    GalleryComponent,
    LoginSignupComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,  // Ensure FormsModule is here
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),  // Initialize Firebase with the environment config
    AngularFirestoreModule,  // Import AngularFirestoreModule to interact with Firestore

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
