import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelPricesComponent } from './component/label-prices/label-prices.component';

const routes: Routes = [
  {
    path: 'label',
    children: [
      {
        path: 'prices',
        component: LabelPricesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabelRoutingModule {}
