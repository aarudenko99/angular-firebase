import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),

    // FirestoreModule is needed for the database features like working with collections, queries, and services for data streaming and manipulation.

    // FireAuthModule is needed for authentication features like monitoring authentication state, Log-in providers and security.

    // FireDatabaseModule allows us to work with Realtime databases. It’s very efficient for mobile and web apps that require synced states across clients in Realtime.

    // AngularFireStorageModule. You can use this module to quickly and easily store and serve user-generated content like photos and videos as well as monitor uploads and metadata associated with files.

    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    // AngularFireAnalyticsModule,


  ],
  exports: [AngularFireModule, AngularFirestoreModule,
    AngularFireAuthModule

  ]
})
export class FirebaseModule { }
