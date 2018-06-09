import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guard/auth.guard';
import { PublicComponent } from './layouts/public.component';
import { PUBLIC_ROUTES } from './pages/public/public.routes';
import { PrivateComponent } from './layouts/private.component';
import { PRIVATE_ROUTES } from './pages/private/private.routes';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: '', component: PrivateComponent, canActivate: [AuthGuard], data: { title: 'Private Views' }, children: PRIVATE_ROUTES },
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
