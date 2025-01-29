import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { addDoc, collection, getDocs, getFirestore, orderBy, query } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator

@Injectable({
  providedIn: 'root'
})
export class MockupService {
  private firestore;
  private collectionName = 'mockup'; // Name of your Firestore collection

  constructor() {
    // Initialize Firebase App here if it's not initialized in appConfig
    const firebaseConfig = {
      apiKey: "AIzaSyA19KWm79n-f2T92Yrvm9myofDZ-1whSs0",
      authDomain: "sadamvenugopal-fd73f.firebaseapp.com",
      projectId: "sadamvenugopal-fd73f",
      storageBucket: "sadamvenugopal-fd73f.firebasestorage.app",
      messagingSenderId: "683383393221",
      appId: "1:683383393221:web:65dd30bdd7023064df19ac"
    };
    initializeApp(firebaseConfig); // Initialize Firebase with your config
    this.firestore = getFirestore(); // Initialize Firestore
  }

  // Add mockup form data to Firestore
  addMockupForm(data: any): Observable<any> {
    const docRef = collection(this.firestore, this.collectionName);
    return from(addDoc(docRef, data)); // Add document to the collection
  }

  // Optional: Get all mockup entries (for admin purposes)
  getMockupForms(): Observable<any[]> {
    const mockupCollectionRef = collection(this.firestore, this.collectionName);
    const q = query(mockupCollectionRef, orderBy("timestamp", "desc"));
    return from(getDocs(q)).pipe(
      map((querySnapshot) => querySnapshot.docs.map((doc: any) => doc.data()))
    );
  }
  
}
