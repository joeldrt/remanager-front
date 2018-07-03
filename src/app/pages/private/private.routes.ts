import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellersComponent } from './sellers/sellers.component';
import { ProjectsComponent } from './projects/projects.component';
import { LandsComponent } from './lands/lands.component';

import { SvgToolComponent } from '../../_digiall-components/svgtool/svgtool.component';
import {AddSellerComponent} from './sellers/add-seller/add-seller.component';

export const PRIVATE_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', breadcrumb: 'dashboard' } },

  // Sellers paths
  { path: 'sellers', component: SellersComponent, data: { title: 'Sellers', breadcrumb: 'sellers' } },
  { path: 'sellers/sellers-new', component: AddSellerComponent, data: { title: 'New Seller', breadcrumb: 'new seller' } },

  // Projects paths
  { path: 'projects', component: ProjectsComponent, data: { title: 'Projects', breadcrumb: 'projects' } },

  // Lands paths
  { path: 'lands', component: LandsComponent, data: { title: 'Lands', breadcrumb: 'lands' } },

  // SvgTool paths
  { path: 'svgtool', component: SvgToolComponent, data: { title: 'Digiall SVGTool', breadcrumb: 'svgtool' } },
];
