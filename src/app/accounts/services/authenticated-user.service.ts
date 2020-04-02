import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { User as FirebaseUser } from 'firebase';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserService {

  private user: User;
  private firebaseUser: FirebaseUser;

  constructor(private afStore: AngularFirestore) {
  }

  setFirebaseUser(firebaseUser: FirebaseUser) {
    this.firebaseUser = firebaseUser;
    if (firebaseUser) {
      this.afStore.doc<any>(`users/${this.firebaseUser.email}`).valueChanges().subscribe(user => {
        this.user = user;
      });

      this.afStore.collection<any>('users').doc(firebaseUser.email)
        .set({ name: firebaseUser.displayName }, { merge: true });
    }
  }

  isLoggedIn() {
    return this.firebaseUser;
  }

  getUserDisplayName() {
    return this.firebaseUser.displayName;
  }

  getUserEmail() {
    return this.firebaseUser.email;
  }

}
