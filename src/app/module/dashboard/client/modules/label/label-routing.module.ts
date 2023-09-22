import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelOrderComponent } from './component/label-order/label-order.component';

const routes: Routes = [
  {
    path: 'label',
    children: [
      {
        path: '',
        component: LabelOrderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabelRoutingModule {}
