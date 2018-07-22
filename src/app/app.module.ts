import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// layout components
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

// services
import { AuthGuard } from './_guard/auth.guard';
import {
  AlertService,
  AuthenticationService,
  UserService,
  AccountService,
  SellersService,
  SvgsService,
  ToasterService,
  ProyectoService,
  ProductoService
} from './_services';

// helpers
import {
  JwtInterceptor,
  ProyectoNavhelper,
  FooterMenuhelper,
} from './_helpers';

// Digiall SVG Tool
import { SvgToolComponent } from './_digiall-components/svgtool/svgtool.component';
import { SvgComponent } from './_digiall-components/svgtool/components/svg/svg.component';

// pages
import { LoginComponent } from './pages/public/login/login.component';
import { TerrenosComponent } from './pages/private/terrenos/terrenos.component';
import { PerfilComponent } from './pages/private/perfil/perfil.component';
import { ClientesComponent } from './pages/private/clientes/clientes.component';
import { VentasComponent } from './pages/private/ventas/ventas.component';
import { ProyectosComponent } from './pages/private/proyectos/proyectos.component';
import { ProyectosMapComponent } from './pages/private/proyectos-map/proyectos-map.component';


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
    LoginComponent,
    SvgToolComponent,
    SvgComponent,
    TerrenosComponent,
    PerfilComponent,
    ClientesComponent,
    VentasComponent,
    ProyectosComponent,
    ProyectosMapComponent,
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
    ToasterService,
    ProyectoService,
    ProyectoNavhelper,
    ProductoService,
    FooterMenuhelper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
