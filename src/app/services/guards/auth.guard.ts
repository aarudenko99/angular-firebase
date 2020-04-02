import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, pipe, of, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    // private auth: AuthenticationService,
    private auth: AngularFireAuth,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot): Observable<boolean> {
    return from(this.auth.authState)
      // .take(1)
      .map(routerStateData => !!routerStateData)
      .tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login'], {
            queryParams: {
              return: routerState.url
            }
          });
        }
      });
    // return true;

    // return this.auth.user$.pipe(
    //   take(1),
    //   map(user => !!user), // <-- map to boolean
    //   tap(loggedIn => {
    //     if (!loggedIn) {
    //       console.log('access denied')
    //       this.router.navigate(['/login']);
    //     }
    //     else {
    //       console.log("user logged in ===> " + loggedIn);
    //     }
    //   })
    // );
  }

}
