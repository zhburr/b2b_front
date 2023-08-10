import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPostageComponent } from './components/order-postage/order-postage.component';
import { OrderListingComponent } from './components/order-listing/order-listing.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderInvoiceComponent } from './components/order-invoice/order-invoice.component';

const routes: Routes = [
  {
    path: 'order',
    children: [
      {
        path: 'postage',
        component: OrderPostageComponent,
      },
      {
        path: 'listing',
        component: OrderListingComponent,
      },
      {
        path: 'details/:Id',
        component: OrderDetailsComponent,
      },
      {
        path: 'invoice/:Id',
        component: OrderInvoiceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
