import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// layout components && services
import {
  PrivateComponent,
  HeaderComponent,
  FooterComponent,
  MenuComponent,
  SettingsComponent,
  ContentHeaderComponent,
} from './layouts/private';

import {
  PublicComponent,
} from './layouts/public';

// pages
import { DashboardComponent } from './pages/private/dashboard/dashboard.component';
import { LoginComponent } from './pages/public/login/login.component';

// services
import { AuthGuard } from './_guard/auth.guard';
import {
  AlertService,
  AuthenticationService,
  UserService,
  AccountService,
  SellersService,
} from './_services';

// helpers
import { JwtInterceptor } from './_helpers';
import { SellersComponent } from './pages/private/sellers/sellers.component';
import { ProjectsComponent } from './pages/private/projects/projects.component';
import { LandsComponent } from './pages/private/lands/lands.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentHeaderComponent,
    MenuComponent,
    SettingsComponent,
    PrivateComponent,
    PublicComponent,
    DashboardComponent,
    LoginComponent,
    SellersComponent,
    ProjectsComponent,
    LandsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    AccountService,
    SellersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
