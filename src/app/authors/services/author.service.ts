import { Injectable } from '@angular/core';
// import { Author } from './author';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { tap, map } from 'rxjs/operators';
import { Author } from '../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  // url = 'http://localhost:4243/authors';

  private authorCollection: AngularFirestoreCollection<Author>;
  authors: Observable<Author[]>;

  constructor(private database: AngularFirestore, private http: HttpClient) {
    this.authorCollection = database.collection<Author>('authors');

    this.authors = this.authorCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Author;
          const id = a.payload.doc.id;
          // console.log({ id, ...data });
          return { id, ...data };
        })
      )
    );
  }

  getAuthors(): Observable<Author[]> {
    return this.authors;
  }

  getAuthor(userKey) {
    return this.authorCollection
      .doc(userKey)
      .snapshotChanges()
      .pipe(tap((stuff) => console.log('stuff :', stuff)));
  }

  addAuthor(author: Author) {
    this.authorCollection.add(author);
  }
}
