import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPostageComponent } from './components/order-postage/order-postage.component';

const routes: Routes = [
  {
    path: 'order',
    children: [
      {
        path: 'postage',
        component: OrderPostageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
