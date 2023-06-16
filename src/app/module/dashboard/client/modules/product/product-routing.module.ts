import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductUploadComponent } from './components/product-upload/product-upload.component';

const routes: Routes = [
  {
    path: 'product',
    children: [
      {
        path: 'listing',
        component: ProductListingComponent,
      },
      {
        path: 'upload',
        component: ProductUploadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
