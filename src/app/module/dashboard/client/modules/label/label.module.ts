import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelRoutingModule } from './label-routing.module';
import { LabelComponent } from './label.component';
import { LabelOrderComponent } from './component/label-order/label-order.component';
import { SharedModule } from 'src/app/module/shared/shared.module';
import { LabelOrderListingComponent } from './component/label-order-listing/label-order-listing.component';

@NgModule({
  declarations: [LabelComponent, LabelOrderComponent, LabelOrderListingComponent],
  imports: [CommonModule, LabelRoutingModule, SharedModule],
})
export class LabelModule {}
