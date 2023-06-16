import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./module/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./module/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
