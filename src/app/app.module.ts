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
  AlertService,
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
  TipoProductoService,
  ValorCampoProductoService,
  ContratoService,
} from './_services';
import { DigiallDateUtils } from '../assets/ts/digiall.date.utils';
import {
  FileService,
} from './_dgtools_services';

// utils
import {ProductUtils} from './_utils/product.utils';

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
import { TerrenosComponent } from './pages/private/terrenos/terrenos.component';
import { PerfilComponent } from './pages/private/perfil/perfil.component';
import { ClientesComponent } from './pages/private/clientes/clientes.component';
import { VentasComponent } from './pages/private/ventas/ventas.component';
import { ProyectosComponent } from './pages/private/proyectos/proyectos.component';
import { ProyectosMapComponent } from './pages/private/proyectos-map/proyectos-map.component';
import { AddClientComponent } from './pages/private/clientes/add-client.component';
import { ProductosComponent } from './pages/private/productos/productos.component';
import { ProductoDetalleComponent } from './pages/private/productos-detalle/producto-detalle.component';
import { InfoClientComponent } from './pages/private/clientes/info-client.component';
import { LoadingComponent } from './_digiall-components/loading/loading.component';
import { AdquirirProductoComponent } from './pages/private/adquirir-producto/adquirir-producto.component';
import { ProductoPagosComponent } from './pages/private/producto-pagos/producto-pagos.component';
import { ProductoCorridaComponent } from './pages/private/producto-corrida/producto-corrida.component';

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
    AddClientComponent,
    ProductosComponent,
    ProductoDetalleComponent,
    InfoClientComponent,
    LoadingComponent,
    AdquirirProductoComponent,
    DgtoolsComponent,
    ProductoPagosComponent,
    ProductoCorridaComponent,
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
    SvgRestService,
    ClientService,
    TipoProductoService,
    ValorCampoProductoService,
    HeaderHelper,
    ProfileHelper,
    ContratoService,
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
