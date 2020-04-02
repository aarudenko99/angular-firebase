import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserRowComponent } from './user-row/user-row.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [UserListComponent,
    UserCardComponent,
    UserTableComponent,
    UserRowComponent,
    UserDetailComponent,
    UserEditComponent],
  imports: [
    CommonModule, RouterModule
  ]
})
export class UsersModule { }

