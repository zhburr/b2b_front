import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListingComponent } from './component/order-listing/order-listing.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'order',
    children: [
      {
        path: 'listing',
        component: OrderListingComponent,
      },
      {
        path : 'details/:Id',
        component : OrderDetailsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
