import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelRoutingModule } from './label-routing.module';
import { LabelComponent } from './label.component';
import { LabelPricesComponent } from './component/label-prices/label-prices.component';
import { SharedModule } from 'src/app/module/shared/shared.module';

@NgModule({
  declarations: [LabelComponent, LabelPricesComponent],
  imports: [CommonModule, LabelRoutingModule, SharedModule],
})
export class LabelModule {}
