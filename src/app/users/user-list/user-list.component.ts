import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  userArray: User[];
  showCard = true;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getUsers().subscribe(
      (data: User[]) => {
        this.userArray = data;
      },
      error => console.log("error occured", error)

    );
  }

  parentFunctionHandler(name) {
    alert(`You sent ${name} up to list from child`);
  }

}
