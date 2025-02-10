import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp, getApp, getApps } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { appRoutes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyA19KWm79n-f2T92Yrvm9myofDZ-1whSs0",
  authDomain: "sadamvenugopal-fd73f.firebaseapp.com",
  projectId: "sadamvenugopal-fd73f",
  storageBucket: "sadamvenugopal-fd73f.firebasestorage.app",
  messagingSenderId: "683383393221",
  appId: "1:683383393221:web:65dd30bdd7023064df19ac"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),

    // Initialize Firebase only if not already initialized
    provideFirebaseApp(() => {
      try {
        if (getApps().length === 0) {
          console.log('Initializing Firebase');
          return initializeApp(firebaseConfig);
        } else {
          console.log('Firebase already initialized');
          return getApp();
        }
      } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw error;
      }
    }),

    // Provide Auth with error handling
    provideAuth(() => {
      try {
        return getAuth();
      } catch (error) {
        console.error('Error getting Auth:', error);
        throw error;
      }
    }),

    // Provide Firestore with error handling
    provideFirestore(() => {
      try {
        return getFirestore();
      } catch (error) {
        console.error('Error getting Firestore:', error);
        throw error;
      }
    }),

    // Provide Messaging with error handling
    provideMessaging(() => {
      try {
        return getMessaging();
      } catch (error) {
        console.error('Error getting Messaging:', error);
        throw error;
      }
    })
  ]
};