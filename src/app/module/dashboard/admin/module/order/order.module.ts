import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderPostageComponent } from './components/order-postage/order-postage.component';
import { SharedModule } from 'src/app/module/shared/shared.module';
import { OrderListingComponent } from './components/order-listing/order-listing.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderInvoiceComponent } from './components/order-invoice/order-invoice.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderPostageComponent,
    OrderListingComponent,
    OrderDetailsComponent,
    OrderInvoiceComponent,
  ],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
  providers: [DecimalPipe],
})
export class OrderModule {}
