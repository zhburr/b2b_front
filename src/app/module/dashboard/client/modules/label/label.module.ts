import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelRoutingModule } from './label-routing.module';
import { LabelComponent } from './label.component';
import { LabelOrderComponent } from './component/label-order/label-order.component';
import { SharedModule } from 'src/app/module/shared/shared.module';

@NgModule({
  declarations: [LabelComponent, LabelOrderComponent],
  imports: [CommonModule, LabelRoutingModule, SharedModule],
})
export class LabelModule {}
