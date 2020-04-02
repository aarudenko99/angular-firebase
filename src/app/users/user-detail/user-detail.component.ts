import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(private activatedRoute: ActivatedRoute,
    private service: UserService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data.payload.data();
        this.user.id = data.payload.id;
      }
    })

    // this.service.getUser(id).subscribe((user) => this.user = user);
  }
}


