import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // Correct import for initializing Firebase
import { provideAuth, getAuth } from '@angular/fire/auth'; // Provide authentication
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Provide Firestore

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Initialize Firebase with AngularFire
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyA19KWm79n-f2T92Yrvm9myofDZ-1whSs0",
        authDomain: "sadamvenugopal-fd73f.firebaseapp.com",
        projectId: "sadamvenugopal-fd73f",
        storageBucket: "sadamvenugopal-fd73f.firebasestorage.app",
        messagingSenderId: "683383393221",
        appId: "1:683383393221:web:65dd30bdd7023064df19ac"
      })
    ),
    // Provide authentication and Firestore services
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
