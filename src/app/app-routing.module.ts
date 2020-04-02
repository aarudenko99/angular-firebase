import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { AccountInfoComponent } from './accounts/account-info/account-info.component';
import { TeamComponent } from './team/team.component';
import { UserResolver } from './users/services/user.resolver';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "login", component: LoginComponent },

  { path: "welcome", component: WelcomeComponent },
  //  { path: "about", component: AboutComponent },

  {
    path: "about", component: AboutComponent
  },

  {
    path: "team", component: TeamComponent
  },

  {
    path: "account",
    component: AccountInfoComponent,
    canActivate: [AngularFireAuthGuard],
    ...canActivate(redirectUnauthorizedToLanding)

  },

  {
    path: "users",
    component: UserListComponent,
    canActivate: [AngularFireAuthGuard],
    ...canActivate(redirectUnauthorizedToLanding)
  },

  {
    path: "users/:id", component: UserDetailComponent,
    resolve: { data: UserResolver },
    canActivate: [AngularFireAuthGuard],
    canActivateChild: [AngularFireAuthGuard],
    children: [
      { path: 'edit', component: UserEditComponent }
    ],

  },

  {
    path: "courses", //Angular 8 Notation with Promise
    loadChildren: () => import('./courses/courses.module')
      .then(mod => {
        console.log('in promise loadChildren');
        return mod.CoursesModule;
      })
  },


  { path: "**", component: NotfoundComponent, pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
