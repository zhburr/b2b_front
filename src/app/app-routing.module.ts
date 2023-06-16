import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './module/shared/component/page-not-found/page-not-found.component';
import { authGuard } from './module/shared/guards/auth.guard';
import { loggedinGuard } from './module/shared/guards/loggedin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./module/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
    canActivate: [loggedinGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./module/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
