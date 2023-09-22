import { Component } from '@angular/core';

@Component({
  selector: 'app-label-order',
  templateUrl: './label-order.component.html',
  styleUrls: ['./label-order.component.scss'],
})
export class LabelOrderComponent {
  selectedWeightIndex: number = 0;

  selecteWeight(event: number) {
    this.selectedWeightIndex = event;
    console.log(event);
  }
}
