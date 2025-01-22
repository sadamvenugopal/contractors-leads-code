import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Ensure compat module for Firebase v9+
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  // Method to store form data in Firestore
  addFormData(formData: any): Promise<any> {
    return this.firestore.collection('mockupRequests').add(formData);
  }
}
