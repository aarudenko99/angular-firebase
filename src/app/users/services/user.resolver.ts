import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { UserService } from './user.service';

@Injectable({ providedIn: "root" })
export class UserResolver implements Resolve<any> {

  constructor(public service: UserService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const userKey = route.paramMap.get('id');
      this.service.getUser(userKey)
        .subscribe(
          data => {
            resolve(data);
          }
        );
    })
  }
}
