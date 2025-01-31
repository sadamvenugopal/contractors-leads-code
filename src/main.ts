import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp, getApp, getApps } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyA19KWm79n-f2T92Yrvm9myofDZ-1whSs0",
  authDomain: "sadamvenugopal-fd73f.firebaseapp.com",
  projectId: "sadamvenugopal-fd73f",
  storageBucket: "sadamvenugopal-fd73f.firebasestorage.app",
  messagingSenderId: "683383393221",
  appId: "1:683383393221:web:65dd30bdd7023064df19ac"
};

// Initialize Firebase explicitly
if (getApps().length === 0) {
  console.log('Initializing Firebase');
  initializeApp(firebaseConfig);
} else {
  console.log('Firebase already initialized');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Provide HttpClientModule at root level

    provideFirebaseApp(() => getApp()), // Get the app after it has been initialized
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging())
  ]
})
  .catch(err => console.error('Error bootstrapping application:', err));
