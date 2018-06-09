import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// layer components && services
import { HeaderComponent } from './layouts/header/header.component';
import { LayoutHeaderService } from './layouts/header/layout_header.service';
import { FooterComponent } from './layouts/footer/footer.component';
import { LayoutFooterService } from './layouts/footer/layout_footer.service';
import { MenuComponent } from './layouts/menu/menu.component';
import { LayoutMenuService } from './layouts/menu/layout_menu.service';
import { SettingsComponent } from './layouts/settings/settings.component';
import { LayoutSettingsService } from './layouts/settings/layout_settings.service';
import { ContentHeaderComponent } from './layouts/content-header/content-header.component';
import { LayoutContentHeaderService } from './layouts/content-header/layout_content-header.service';

// pages
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

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
    LoginComponent
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
    LayoutSettingsService,
    LayoutMenuService,
    LayoutHeaderService,
    LayoutFooterService,
    LayoutContentHeaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
