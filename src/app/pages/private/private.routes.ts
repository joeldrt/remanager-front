import { Routes } from '@angular/router';

import { SvgToolComponent } from '../../_digiall-components/svgtool/svgtool.component';

import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectosMapComponent} from './proyectos-map/proyectos-map.component';
import { TerrenosComponent } from './terrenos/terrenos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoDetalleComponent } from './productos-detalle/producto-detalle.component';
import { AddClientComponent } from './clientes/add-client.component';
import { InfoClientComponent } from './clientes/info-client.component';
import { AdquirirProductoComponent } from './adquirir-producto/adquirir-producto.component';
import { DgtoolsComponent } from './dgtools/dgtools.component';
import {ProductoPagosComponent} from './producto-pagos/producto-pagos.component';
import {ProductoCorridaComponent} from './producto-corrida/producto-corrida.component';

export const PRIVATE_ROUTES: Routes = [
  // Proyectos - es la primera pantalla que le queremos mostrar al venddor
  { path: '', redirectTo: 'proyectos', pathMatch: 'full'},
  { path: 'proyectos', component: ProyectosComponent, data: { title: 'Proyectos', breadcrumb: 'proyectos' } },
  { path: 'proyectos/mapa', component: ProyectosMapComponent, data: { title: 'Proyectos Mapa', breadcrumb: 'proyectos-mapa' } },

  // Productos
  { path: 'productos', component: ProductosComponent , data: { title: 'Productos', breadcrumb: 'productos' } },
  { path: 'productos/:id', component: ProductoDetalleComponent, data: { title: 'Productos', breadcrumb: 'productos'} },
  { path: 'adquirir/:id', component: AdquirirProductoComponent, data: { title: 'Adquirir Producto', breadcrumb: 'adquirir producto'} },
  { path: 'productocorrida', component: ProductoCorridaComponent, data: { title: 'Producto Corrida', breadcrumb: 'producto corrida'} },

  // Pagos
  { path: 'pagosproducto', component: ProductoPagosComponent, data: { title: 'Pagos de Producto', breadcrumb: 'pagos producto'} },

  // Clientes
  { path: 'clientes', component: ClientesComponent, data: { title: 'Clientes', breadcrumb: 'clientes' } },
  { path: 'clientes/add', component: AddClientComponent, data: { title: 'Agregar Cliente', breadcrumb: 'agregar-cliente' } },
  { path: 'clientes/info', component: InfoClientComponent, data: { title: 'Información del Cliente', breadcrumb: 'informacion-cliente' } },

  // Perfil
  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil', breadcrumb: 'perfil' } },

  // Mis Ventas
  { path: 'ventas', component: VentasComponent, data: { title: 'Ventas', breadcrumb: 'ventas' } },

  // SvgTool paths
  { path: 'svgtool', component: SvgToolComponent, data: { title: 'Digiall SVGTool', breadcrumb: 'svgtool' } },
  { path: 'svgtool/:id', component: SvgToolComponent, data: { title: 'Digiall SVGTool', breadcrumb: 'svgtool' } },

  // Digiall Misc dgtools
  { path: 'dgtools', component: DgtoolsComponent, data: { title: 'Digiall DG Tools', breadcrumb: 'dgtools' } },
];
