import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { moveIn } from '../router.animations';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../_alert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: { '[@moveIn]': '' }
})
export class LoginComponent implements OnInit {
  isSignIn = true;
  isRegister = false;
  email: string;
  password: string;
  return = '';

  userlogin = { email: "", password: "" };

  error: any;
  googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

  showSpinner = localStorage.getItem('showSpinner') === 'true' ? true : false;

  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    protected alert: AlertService
  ) {

  }

  ngOnInit() {
    // Get the query params
    // console.log("in ngOnOnit login");
    // this.route.queryParams
    //   .subscribe(params => this.return = params['return'] || '/welcome');
  }

  showRegister() {
    this.isSignIn = false;
    this.isRegister = true;
  }

  signup() {
    this.authService.signUp(this.userlogin.email, this.userlogin.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.signIn(this.userlogin.email, this.userlogin.password);
  }

  logout() {
    this.authService.signOut();
    // this.authService.logout();
  }

  loginFb() {
    this.afAuth.auth.signInWithRedirect(this.facebookAuthProvider);
    this.afAuth.auth.getRedirectResult().then(result => {
      if (result.user) {
        console.log("In Facebook callback");

        this.showSpinner = true;
        localStorage.setItem('showSpinner', 'true');
        this.router.navigate(['/account']);
      }
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      this.error = errorMessage;
    });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithRedirect(this.googleAuthProvider).then(
      (success) => {
        this.router.navigate(['/account']);
      }).catch(
        (err) => {
          this.error = err;
          if (err.code === 'auth/account-exists-with-different-credential') {
            console.log("error with credentials");
          }
        });
  }


  // Step 1.
  // User tries to sign in to Google.
  // An error happened.
  /*  if (error.code === 'auth/account-exists-with-different-credential') {
      // Step 2.
      // User's email already exists.
      // The pending Google credential.
      var pendingCred = error.credential;
      // The provider account's email address.
      var email = error.email;
      // Get sign-in methods for this email.
      auth.fetchSignInMethodsForEmail(email).then(function (methods) {
        // Step 3.
        // If the user has several sign-in methods,
        // the first method in the list will be the "recommended" method to use.
        if (methods[0] === 'password') {
          // Asks the user their password.
          // In real scenario, you should handle this asynchronously.
          var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
          auth.signInWithEmailAndPassword(email, password).then(function (user) {
            // Step 4a.
            return user.linkWithCredential(pendingCred);
          }).then(function () {
            // Google account successfully linked to the existing Firebase user.
            goToApp();
          });
          return;
        }
        // All the other cases are external providers.
        // Construct provider object for that provider.
        // TODO: implement getProviderForProviderId.
        var provider = getProviderForProviderId(methods[0]);
        // At this point, you should let the user know that they already has an account
        // but with a different provider, and let them validate the fact they want to
        // sign in with this provider.
        // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
        // so in real scenario you should ask the user to click on a "continue" button
        // that will trigger the signInWithPopup.
        auth.signInWithPopup(provider).then(function (result) {
          // Remember that the user may have signed in with an account that has a different email
          // address than the first one. This can happen as Firebase doesn't control the provider's
          // sign in flow and the user is free to login using whichever account they own.
          // Step 4b.
          // Link to Google credential.
          // As we have access to the pending credential, we can directly call the link method.
          result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function (usercred) {
            // Google account successfully linked to the existing Firebase user.
            goToApp();
          });
        });
      });
    }
  });
  */

  loginEmail() {
    this.router.navigate(['/login'], {
      queryParams: {
        return: this.return
      }
    });
  }
}
