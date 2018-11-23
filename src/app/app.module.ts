import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SlideshowModule } from 'ng-simple-slideshow';

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
  AuthenticationService,
  UserService,
  AccountService,
  SellersService,
  SvgsService,
  ToasterService,
  ProyectoService,
  ProductoService,
  SvgRestService,
  ClientService,
  ContratoService,
  UserExtraService,
} from './_services';
import {
  FileService,
} from './_dgtools_services';

// utils
import {
  ProductUtils,
  DigiallDateUtils
} from './_utils';

// helpers
import {
  JwtInterceptor,
  ProyectoNavhelper,
  FooterMenuhelper,
  HeaderHelper,
  ProfileHelper,
} from './_helpers';

// Digiall SVG Tool
import { SvgToolComponent } from './_digiall-components/svgtool/svgtool.component';
import { SvgComponent } from './_digiall-components/svgtool/components/svg/svg.component';

// Digiall Misc dgtools
import { DgtoolsComponent } from './pages/private/dgtools/dgtools.component';

// pages
import { LoginComponent } from './pages/public/login/login.component';
import { PerfilComponent } from './pages/private/perfil/perfil.component';
import { ClientesComponent } from './pages/private/clientes/clientes.component';
import { ClienteDetalleComponent } from './pages/private/clientes/cliente-detalle.component';
import { ClienteContratoComponent } from './pages/private/clientes/cliente-contrato.component';
import { VentasComponent } from './pages/private/ventas/ventas.component';
import { ProyectosComponent } from './pages/private/proyectos/proyectos.component';
import { ProyectosMapComponent } from './pages/private/proyectos-map/proyectos-map.component';
import { ProductosComponent } from './pages/private/productos/productos.component';
import { ProductoDetalleComponent } from './pages/private/productos-detalle/producto-detalle.component';
import { InfoClientComponent } from './pages/private/clientes/info-client.component';
import { LoadingComponent } from './_digiall-components/loading/loading.component';
import { ProductosAdquirirComponent } from './pages/private/productos-adquirir/productos-adquirir.component';
import { CorridaComponent } from './pages/private/corrida/corrida.component';
import { VenderComponent } from './pages/private/vender/vender.component';
import { ContratosVisorComponent } from './pages/private/contratos-visor/contratos-visor.component';

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
    PerfilComponent,
    ClientesComponent,
    ClienteDetalleComponent,
    ClienteContratoComponent,
    VentasComponent,
    ProyectosComponent,
    ProyectosMapComponent,
    ProductosComponent,
    ProductoDetalleComponent,
    InfoClientComponent,
    LoadingComponent,
    ProductosAdquirirComponent,
    DgtoolsComponent,
    CorridaComponent,
    VenderComponent,
    ContratosVisorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SlideshowModule,
  ],
  providers: [
    AuthGuard,
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
    SvgRestService,
    ClientService,
    HeaderHelper,
    ProfileHelper,
    ContratoService,
    UserExtraService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    DigiallDateUtils,
    // _dgtools_services
    FileService,
    ProductUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
