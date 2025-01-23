import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // Import RouterModule for router-outlet
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule for common directives

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FirebaseService } from './services/firebase.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent  // Declare AppHeaderComponent here
  ],
  imports: [
    BrowserModule,
    CommonModule,  // Import CommonModule for common directives like *ngIf, *ngFor
    FormsModule,
    ReactiveFormsModule,
    RouterModule,  // Import RouterModule for router-outlet
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [FirebaseService]
})
export class AppModule {}
