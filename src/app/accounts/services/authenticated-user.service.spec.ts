import {TestBed} from '@angular/core/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {User as FirebaseUser, User} from 'firebase';
import {of} from 'rxjs';
import {Bike} from '../interfaces/bike';

import {UserService} from './user.service';

export class MockUserService {
  setFirebaseUser(user: User) {
  }

  isLoggedIn() {
    return false;
  }

  getUserDisplayName() {
    return '';
  }

  getRentedBikeId() {
    return '';
  }
}

export class MockAngularFirestore {
  collection(collectionName: string) {
    return {
      doc(documentName: string) {
        return {
          set(object: any) {
            return;
          }
        };
      }
    };
  }

  doc(documentName: string) {
    return {
      valueChanges(object: any) {
        return of({rentedBikeId: 1, rentedBikeName: 'bikeName'});
      }
    };
  }
}

let service: UserService;
const mockFirebaseUser = {displayName: 'test', email: 'test@gmail.com'} as FirebaseUser;

describe('UserService', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          UserService,
          {provide: AngularFirestore, useClass: MockAngularFirestore}
        ]
      });
      service = TestBed.get(UserService);
      (service as any).firebaseUser = mockFirebaseUser;
    }
  );

  it('should assign bike to user', () => {
    (service as any).firebaseUser = mockFirebaseUser;

    const angularFirestore: AngularFirestore = TestBed.get(AngularFirestore);
    spyOn(angularFirestore.collection('users').doc(mockFirebaseUser.email), 'set');

    const bike = {
      payload: {
        doc: {
          id: 1,
          data() {
            return {name: 'test bike name'} as Bike;
          }
        }
      }
    };
    service.assignBikeToUser(bike as any);
    expect(angularFirestore.collection('users').doc(mockFirebaseUser.email).set).toHaveBeenCalledWith(
      {
        rentedBikeId: 1,
        rentedBikeName: 'test bike name',
        rentStartTime: Date.now()
      }
    );
  });

  it('should unassign bike from user', () => {
    const angularFirestore: AngularFirestore = TestBed.get(AngularFirestore);
    spyOn(angularFirestore.collection('users').doc(mockFirebaseUser.email), 'set');

    service.unassignBikeFromUser();
    expect(angularFirestore.collection('users').doc(mockFirebaseUser.email).set).toHaveBeenCalledWith(
      {
        rentedBikeId: null,
        rentedBikeName: null,
        rentStartTime: null
      }
    );
  });

  it('should update stored data after login', () => {
    const angularFirestore: AngularFirestore = TestBed.get(AngularFirestore);
    spyOn(angularFirestore.collection('users').doc(mockFirebaseUser.email), 'set');

    service.setFirebaseUser(mockFirebaseUser);
    expect(angularFirestore.collection('users').doc(mockFirebaseUser.email).set).toHaveBeenCalledWith(
      {email: 'test@gmail.com'}
    );
  });
});
