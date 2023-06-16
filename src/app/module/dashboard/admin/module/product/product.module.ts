import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductApprovalComponent } from './component/product-approval/product-approval.component';
import { SharedModule } from 'src/app/module/shared/shared.module';

@NgModule({
  declarations: [ProductComponent, ProductApprovalComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}
