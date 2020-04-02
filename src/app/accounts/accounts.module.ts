import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AccountInfoComponent,
    AccountMenuComponent, AddressFormComponent, LoginComponent,
    RegisterComponent

  ],
  exports: [],
  imports: [
    CommonModule, SharedModule
  ]
})
export class AccountsModule { }
