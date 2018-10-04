import { Routes } from '@angular/router';

import { SvgToolComponent } from '../../_digiall-components/svgtool/svgtool.component';

import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectosMapComponent } from './proyectos-map/proyectos-map.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetalleComponent } from './clientes/cliente-detalle.component';
import { ClienteContratoComponent } from './clientes/cliente-contrato.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoDetalleComponent } from './productos-detalle/producto-detalle.component';
import { ProductosAdquirirComponent } from './productos-adquirir/productos-adquirir.component';
import { DgtoolsComponent } from './dgtools/dgtools.component';
import { CorridaComponent } from './corrida/corrida.component';
import { VenderComponent } from './vender/vender.component';

export const PRIVATE_ROUTES: Routes = [
  // Proyectos - es la primera pantalla que le queremos mostrar al venddor
  {path: '', redirectTo: 'proyectos', pathMatch: 'full'},
  {path: 'proyectos', component: ProyectosComponent, data: {title: 'Proyectos', breadcrumb: 'proyectos'}},
  {
    path: 'proyectos/producto/:producto_id',
    component: ProductoDetalleComponent,
    data: {title: 'Detalle de producto', breadcrumb: 'detalle de producto'}
  },
  {
    path: 'proyectos/producto/:producto_id/adquirir',
    component: ProductosAdquirirComponent,
    data: { title: 'Adquirir producto', breadcrumb: 'adquirir producto'}
  },
  {
    path: 'proyectos/producto/:producto_id/adquirir/:cliente_id',
    component: ProductosAdquirirComponent,
    data: { title: 'Adquirir producto', breadcrumb: 'adquirir producto'}
  },
  {
    path: 'proyectos/producto/:producto_id/adquirir/:cliente_id/corrida',
    component: CorridaComponent,
    data: { title: 'Corrida financiera producto', breadcrumb: 'corrida finanaciera producto'}
  },
  {
    path: 'proyectos/producto/:producto_id/adquirir/:cliente_id/vender',
    component: VenderComponent,
    data: { title: 'Vender producto', breadcrumb: 'vender producto'}
  },

  {
    path: 'proyectos/mapa',
    component: ProyectosMapComponent,
    data: { title: 'Proyectos', breadcrumb: 'proyectos'}
  },
  {
    path: 'proyectos/mapa/producto/:producto_id',
    component: ProductoDetalleComponent,
    data: { title: 'Detalle de producto', breadcrumb: 'detalle de producto'}
  },
  {
    path: 'proyectos/mapa/producto/:producto_id/adquirir',
    component: ProductosAdquirirComponent,
    data: { title: 'Adquirir producto', breadcrumb: 'adquirir producto'}
  },
  {
    path: 'proyectos/mapa/producto/:producto_id/adquirir/:cliente_id',
    component: ProductosAdquirirComponent,
    data: { title: 'Adquirir producto', breadcrumb: 'adquirir producto'}
  },
  {
    path: 'proyectos/mapa/producto/:producto_id/adquirir/:cliente_id/corrida',
    component: CorridaComponent,
    data: { title: 'Corrida financiera de producto', breadcrumb: 'corrida financiera producto'}
  },
  {
    path: 'proyectos/mapa/producto/:producto_id/adquirir/:cliente_id/vender',
    component: VenderComponent,
    data: { title: 'Vender producto', breadcrumb: 'vender producto'}
  },

  // Productos
  { path: 'productos', component: ProductosComponent , data: { title: 'Productos', breadcrumb: 'productos' } },
  { path: 'productos/producto/:producto_id', component: ProductoDetalleComponent, data: { title: 'Productos', breadcrumb: 'productos'} },
  {
    path: 'productos/producto/:producto_id/adquirir',
    component: ProductosAdquirirComponent,
    data: { title: 'Adquirir Producto', breadcrumb: 'adquirir producto'}
  },
  {
    path: 'productos/producto/:producto_id/adquirir/:cliente_id',
    component: ProductosAdquirirComponent,
    data: { title: 'Adquirir Producto', breadcrumb: 'adquirir producto'}
  },
  {
    path: 'productos/producto/:producto_id/adquirir/:cliente_id/corrida',
    component: CorridaComponent,
    data: { title: 'Adquirir producto', breadcrumb: 'adquirir producto'}
  },
  {
    path: 'productos/producto/:producto_id/adquirir/:cliente_id/vender',
    component: VenderComponent,
    data: { title: 'Vender producto', breadcrumb: 'vender producto'}
  },

  // Clientes
  {path: 'clientes', component: ClientesComponent, data: { title: 'Clientes', breadcrumb: 'clientes'}},
  {path: 'clientes/:cliente_id', component: ClienteDetalleComponent, data: {title: 'Detalle del Cliente', breadcrumb: 'detalle-cliente'}},
  {
    path: 'clientes/:cliente_id/contratos',
    component: ClienteContratoComponent,
    data: {title: 'Contratos por cliente', breadcrumb: 'detalle-cliente'}
  },
  {
    path: 'clientes/:cliente_id/contratos/editarcliente',
    component: ClienteDetalleComponent,
    data: {title: 'Detalle del Cliente', breadcrumb: 'detalle-cliente'}
  },

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
