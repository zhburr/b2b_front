import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductUploadComponent } from './components/product-upload/product-upload.component';
import { SharedModule } from 'src/app/module/shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListingComponent,
    ProductUploadComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}
