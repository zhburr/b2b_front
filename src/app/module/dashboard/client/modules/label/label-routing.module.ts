import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelOrderComponent } from './component/label-order/label-order.component';
import { LabelOrderListingComponent } from './component/label-order-listing/label-order-listing.component';

const routes: Routes = [
  {
    path: 'label',
    children: [
      {
        path: '',
        component: LabelOrderComponent,
      },
      {
        path: 'listing',
        component: LabelOrderListingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabelRoutingModule {}
