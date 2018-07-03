import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellersComponent } from './sellers/sellers.component';
import { ProjectsComponent } from './projects/projects.component';
import { LandsComponent } from './lands/lands.component';

import { SvgToolComponent } from '../../_digiall-components/svgtool/svgtool.component';

export const PRIVATE_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', breadcrumb: 'dashboard' } },
  { path: 'sellers', component: SellersComponent, data: { title: 'Sellers', breadcrumb: 'sellers' } },
  { path: 'projects', component: ProjectsComponent, data: { title: 'Projects', breadcrumb: 'projects' } },
  { path: 'lands', component: LandsComponent, data: { title: 'Lands', breadcrumb: 'lands' } },
  { path: 'svgtool', component: SvgToolComponent, data: { title: 'Digiall SVGTool', breadcrumb: 'svgtool' } },
  { path: 'svgtool/:id', component: SvgToolComponent, data: { title: 'Digiall SVGTool', breadcrumb: 'svgtool' } },
];
