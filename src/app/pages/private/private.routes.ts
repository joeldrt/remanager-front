import { Routes } from '@angular/router';

import { SvgToolComponent } from '../../_digiall-components/svgtool/svgtool.component';

import {TerrenosComponent} from './terrenos/terrenos.component';
import {ClientesComponent} from './clientes/clientes.component';
import {PerfilComponent} from './perfil/perfil.component';
import {VentasComponent} from './ventas/ventas.component';

export const PRIVATE_ROUTES: Routes = [
  // Terrenos - es la primera pantalla que le queremos mostrar al venddor
  { path: '', redirectTo: 'terrenos', pathMatch: 'full'},
  { path: 'terrenos', component: TerrenosComponent, data: { title: 'Terrenos', breadcrumb: 'terrenos' } },

  // Clientes
  { path: 'clientes', component: ClientesComponent, data: { title: 'Clientes', breadcrumb: 'clientes' } },

  // Perfil
  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil', breadcrumb: 'perfil' } },

  // Mis Ventas
  { path: 'ventas', component: VentasComponent, data: { title: 'Ventas', breadcrumb: 'ventas' } },

  // SvgTool paths
  { path: 'svgtool', component: SvgToolComponent, data: { title: 'Digiall SVGTool', breadcrumb: 'svgtool' } },
  { path: 'svgtool/:id', component: SvgToolComponent, data: { title: 'Digiall SVGTool', breadcrumb: 'svgtool' } },
];
