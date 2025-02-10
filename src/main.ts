import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp, getApp, getApps } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideHttpClient } from '@angular/common/http';
import { SocialAuthServiceConfig, SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';

// Firebase Configuration
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

// Bootstrap Application
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => getApp()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),

    // Social Authentication Providers (Fix: No "provideSocialAuth")
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // Change to true if needed
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('YOUR_FACEBOOK_CLIENT_ID')
          }
        ]
      } as SocialAuthServiceConfig
    }, provideFirebaseApp(() => initializeApp({ projectId: "sadamvenugopal-fd73f", appId: "1:683383393221:web:65dd30bdd7023064df19ac", storageBucket: "sadamvenugopal-fd73f.firebasestorage.app", apiKey: "AIzaSyA19KWm79n-f2T92Yrvm9myofDZ-1whSs0", authDomain: "sadamvenugopal-fd73f.firebaseapp.com", messagingSenderId: "683383393221" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
})
  .catch(err => console.error('Error bootstrapping application:', err));
