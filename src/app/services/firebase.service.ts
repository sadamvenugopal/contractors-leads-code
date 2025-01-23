import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  // Method to store user data in Firestore
  saveUserData(userData: { name: string; email: string; phone: string; description: string }): Promise<any> {
    return this.firestore.collection('users').add(userData);
  }
}
