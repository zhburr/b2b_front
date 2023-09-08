import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserProductComponent } from './components/user-product/user-product.component';
import { OrderListingComponent } from '../order/components/order-listing/order-listing.component';

const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: 'listing',
        component: UsersComponent,
      },
      {
        path: 'products',
        component: UserProductComponent,
      },
      {
        path: 'orders/:email',
        component: OrderListingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
