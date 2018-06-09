import {Routes} from '@angular/router';
import {HomeComponent} from '../private/home/home.component';

export const PRIVATE_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
];
