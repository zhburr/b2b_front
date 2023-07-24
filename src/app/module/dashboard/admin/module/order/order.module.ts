import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderPostageComponent } from './components/order-postage/order-postage.component';
import { SharedModule } from 'src/app/module/shared/shared.module';

@NgModule({
  declarations: [OrderComponent, OrderPostageComponent],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}
