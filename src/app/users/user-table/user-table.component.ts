import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  @Input()
  userArray: User[];

  constructor() { }

  ngOnInit() {
  }

}
