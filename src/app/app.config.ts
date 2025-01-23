import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "sadamvenugopal-fd73f", appId: "1:683383393221:web:65dd30bdd7023064df19ac", storageBucket: "sadamvenugopal-fd73f.firebasestorage.app", apiKey: "AIzaSyA19KWm79n-f2T92Yrvm9myofDZ-1whSs0", authDomain: "sadamvenugopal-fd73f.firebaseapp.com", messagingSenderId: "683383393221" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
