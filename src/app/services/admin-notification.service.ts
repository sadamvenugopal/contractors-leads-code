import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { Firestore, collection, getDocs, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminNotificationService {
  private messaging: Messaging = inject(Messaging);
  private firestore: Firestore = inject(Firestore);
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  // Get FCM token for admin
  getAdminFCMToken(): Observable<string> {
    return new Observable((observer) => {
      getToken(this.messaging, { vapidKey: 'YOUR_VAPID_KEY' }) // Replace with your FCM VAPID key
        .then((token) => {
          if (token) {
            // Store the token in Firestore
            this.saveAdminToken(token);
            observer.next(token);
          } else {
            observer.error('No token available');
          }
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  // Save admin FCM token to Firestore
  private saveAdminToken(token: string) {
    const adminTokenRef = doc(this.firestore, 'admins', 'admin_id'); // Replace 'admin_id' with actual admin ID
    setDoc(adminTokenRef, { token }, { merge: true })
      .then(() => {
        console.log('Admin token saved to Firestore');
      })
      .catch((error) => {
        console.error('Error saving admin token:', error);
      });
  }

  // Listen for incoming notifications (optional, for admins to receive messages in real-time)
  listenForNotifications() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received: ', payload);
      // Handle notification data here
    });
  }

  // Send notification to admin via Cloud Function
  sendAdminNotification(message: string): void {
    const adminsRef = collection(this.firestore, 'admins');
    getDocs(adminsRef)
      .then((snapshot) => {
        const tokens: string[] = [];

        snapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data();
          if (data.token) {
            tokens.push(data.token);
          }
        });

        if (tokens.length === 0) {
          console.warn('No admin tokens found.');
          return;
        }


        // Call Cloud Function to send notification
        this.http.post('https://us-central1-sadamvenugopal-fd73f.cloudfunctions.net/sendNotification', {
          tokens,
          notification: {
            title: 'New Mockup Submission',
            body: message,
          },
        }).subscribe(
          (response) => {
            console.log('Admin notification sent!', response);
          },
          (error) => {
            console.error('Error sending notification:', error);
          }
        );
      })
      .catch((error) => {
        console.error('Error retrieving admin tokens:', error);
      });
  }
}
