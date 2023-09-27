import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelPricesComponent } from './component/label-prices/label-prices.component';
import { LabelOrderListingComponent } from './component/label-order-listing/label-order-listing.component';

const routes: Routes = [
  {
    path: 'label',
    children: [
      {
        path: 'prices',
        component: LabelPricesComponent,
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
