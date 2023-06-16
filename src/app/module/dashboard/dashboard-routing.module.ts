import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from '../shared/interface/role.model';
import { roleGuard } from '../shared/guards/role.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        data: { role: [Roles.Admin] },
        canActivate: [roleGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import('./client/client.module').then((m) => m.ClientModule),
        data: { role: [Roles.Client] },
        canActivate: [roleGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
        data: { role: [Roles.Customer] },
        canActivate: [roleGuard],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
