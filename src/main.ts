import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

bootstrapApplication(AppComponent, {
  providers: [provideFirebaseApp(() => initializeApp({ projectId: "sadamvenugopal-fd73f", appId: "1:683383393221:web:65dd30bdd7023064df19ac", storageBucket: "sadamvenugopal-fd73f.firebasestorage.app", apiKey: "AIzaSyA19KWm79n-f2T92Yrvm9myofDZ-1whSs0", authDomain: "sadamvenugopal-fd73f.firebaseapp.com", messagingSenderId: "683383393221" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
})
  .catch(err => console.error(err));
