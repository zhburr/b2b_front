import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lnavbar',
  templateUrl: './lnavbar.component.html',
  styleUrls: ['./lnavbar.component.scss'],
})
export class LnavbarComponent {
  @Output() callback: EventEmitter<string> = new EventEmitter(); //this will emit any sort information

  constructor(private scroller: ViewportScroller) {}

  clickOnMenu(event: any) {
    this.callback.emit(event);
  }
}
