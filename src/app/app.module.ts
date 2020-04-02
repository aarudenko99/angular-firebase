import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlertModule } from './_alert';

import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './footer/footer.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { UsersModule } from './users/users.module';
import { AuthorComponent } from './authors/author/author.component';
import { AccountsModule } from './accounts/accounts.module';
import { CoursesModule } from './courses/courses.module';
import { SharedModule } from './shared/shared.module';
import { AngularFireStorage } from '@angular/fire/storage';
import { TeamComponent } from './team/team.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotfoundComponent,
    WelcomeComponent,
    AboutComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    AuthorComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule,
    AccountsModule,
    CoursesModule,
    UsersModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AngularFireStorage, AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
