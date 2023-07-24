import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderListingComponent } from './component/order-listing/order-listing.component';
import { SharedModule } from 'src/app/module/shared/shared.module';

@NgModule({
  declarations: [OrderComponent, OrderListingComponent],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}
