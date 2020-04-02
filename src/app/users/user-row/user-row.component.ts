import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: '[app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent implements OnInit {
  @Input()
  isEven: boolean;

  @Input()
  user: User;

  constructor() { }

  ngOnInit() {
  }

}
