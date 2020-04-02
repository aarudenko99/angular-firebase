import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { AlertService } from '../_alert/alert.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  public user$: Observable<User>;
  private isUserLoggedIn: boolean = false;

  // userData: Observable<firebase.User>;
  currentUser;

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private alertService: AlertService) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) { // get info if it exists for a user
          this.isUserLoggedIn = true;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        // tslint:disable-next-line: one-line
        else { // or simply return Obs of null
          this.isUserLoggedIn = false;
          return of(null);
        }
      })
    );
  }

  isLoggedIn() {
    return this.isUserLoggedIn;
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.isUserLoggedIn = true;
    return this.updateUserData(credential.user);
  }

  //updates the users doc with info - WHY?  understand first time maybe....
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // getting data to update in firestore
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email,
      photoURL: user.photoURL || ''
    };

    // set is destructive - merge makes it only change what is needed
    return userRef.set(data, { merge: true })
  }

  /* Sign out */
  async signOut() {
    this.isUserLoggedIn = false;
    await this.afAuth
      .auth
      .signOut();
    return this.router.navigate(['/']);
  }


  signUp(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
        this.isUserLoggedIn = true;
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  signIn(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        // TODO: store off ths res info
        console.log('Successfully signed in!');
        this.isUserLoggedIn = true;
        this.updateUserData(res.user);

        // TODO put in logic to verify email address
        if (res.user.emailVerified) {
          window.alert('res.user.emailVerified');
          // this.SetUserData(result.user);
          // this.router.navigateByUrl(url);
        } else {
          window.alert('Email is not verified');
          return false;
        }

        this.alertService.success("Successful login");
        this.router.navigate(['./account']);
      })
      .catch(err => {
        this.alertService.error("Invalid credentials. Please recheck and try again.");
      });
  }


  // Store user is store and firebase
  // setUserData(user: User) {
  //   const userRef: AngularFirestoreDocument<any> = this.firebaseStorage.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName || user.email,
  //     photoURL: user.photoURL || '',
  //     emailVerified: user.emailVerified
  //   };
  //   return userRef.set(userData, {
  //     merge: true
  //   });
  // }

}
