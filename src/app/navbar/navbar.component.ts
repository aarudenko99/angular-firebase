import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  title = "Website Redesign";
  isLoggedIn = false;
  userDisplayName: string;

  constructor(private afAuth: AngularFireAuth,
    public authService: AuthenticationService) {
  }

  ngOnInit() {
    // TODO: update
    // this.afAuth.user.subscribe(firebaseUser => {
    //   this.authService.setFirebaseUser(firebaseUser);
    // });

    //firebase user had mroe details
    this.afAuth.authState
      // .pipe(tap((data) => console.log(data)))
      .subscribe(auth => {
        if (auth) {
          this.isLoggedIn = true;
          this.userDisplayName = auth.displayName || auth.email;
        }
        else {
          this.isLoggedIn = false;
        }
      });
  }


  logout() {
    this.isLoggedIn = false;
    this.afAuth.auth.signOut();
  }
}



// TODO hook to new service
// get userDisplayName(): string {
//   return this.authService.isisLoggedIn() ? this.userService.getUserDisplayName() : '';
// }

