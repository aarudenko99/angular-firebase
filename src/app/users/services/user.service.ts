import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { User } from '../model/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: "root"
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private database: AngularFirestore,

  ) {
    this.usersCollection = database.collection<User>('users');

    this.users = this.usersCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          // console.log({ id, ...data });
          return { id, ...data };
        })
      )
    );
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getUser(userKey) {
    return this.usersCollection.doc(userKey).snapshotChanges();
    // .pipe(tap((stuff) => console.log('stuff :', stuff)))
  }


}
