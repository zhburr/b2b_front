import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductApprovalComponent } from './component/product-approval/product-approval.component';

const routes: Routes = [
  {
    path: 'product',
    children: [
      {
        path: 'approval',
        component: ProductApprovalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
