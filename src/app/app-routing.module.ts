import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './_guard/auth.guard';
import { LoginComponent } from './pages/login/login.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
