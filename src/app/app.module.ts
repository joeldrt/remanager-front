import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// layer components && services
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { SettingsComponent } from './layouts/settings/settings.component';
import { ContentHeaderComponent } from './layouts/content-header/content-header.component';

import { PrivateComponent } from './layouts/private.component';
import { PublicComponent } from './layouts/public.component';

// pages
import { HomeComponent } from './pages/private/home/home.component';
import { LoginComponent } from './pages/public/login/login.component';

// services
import { AuthGuard } from './_guard/auth.guard';
import { AlertService, AuthenticationService, } from './_services/index';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentHeaderComponent,
    MenuComponent,
    SettingsComponent,
    HomeComponent,
    LoginComponent,
    PrivateComponent,
    PublicComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
