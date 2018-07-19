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
  SvgsService
} from './_services';

// helpers
import { JwtInterceptor } from './_helpers';
import { SellersComponent } from './pages/private/sellers/sellers.component';
import { ProjectsComponent } from './pages/private/projects/projects.component';
import { LandsComponent } from './pages/private/lands/lands.component';

// Digiall SVG Tool
import { SvgToolComponent } from './_digiall-components/svgtool/svgtool.component';
import { SvgComponent } from './_digiall-components/svgtool/components/svg/svg.component';
import { AddSellerComponent } from './pages/private/sellers/add-seller/add-seller.component';


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
    LandsComponent,
    SvgToolComponent,
    SvgComponent,
    AddSellerComponent,
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
    SvgsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
