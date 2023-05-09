import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';

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

  @HostListener('window:scroll', []) onWindowScroll() {
    const verticalOffset =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (verticalOffset > 100) {
      console.log('a');

      document.getElementById('lnavbar')!.style.padding = '2rem 5rem';
      document.getElementById('lnavbar')!.style.borderBottom =
        '1px solid lightgrey';
    } else {
      console.log('b');

      document.getElementById('lnavbar')!.style.padding = '2.5rem 5rem';
      document.getElementById('lnavbar')!.style.borderBottom = 'none';
    }
  }
}
