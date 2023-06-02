import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tabs: any = {
    mission: true,
    whyUs: false,
    promise: false,
    weDo: false,
  };
  href: string = '';
  msg: string = '';
  aboutUsReadmore: boolean = false;
  constructor(caruselConfig: NgbCarouselConfig) {
    caruselConfig.interval = 10000;
    caruselConfig.animation = true;
    caruselConfig.pauseOnHover = true;
  }

  changeTab(type: any) {
    Object.keys(this.tabs).forEach((res: any) => {
      this.tabs[res] = res === type;
    });
  }

  getHref() {
    let newMsg = this.msg.replace(/ /g, '%20');
    this.href = `https://wa.me/447411455885?text=${newMsg}`;
    this.msg = '';
  }

  gotoView(event: string) {
    console.log(event);

    document
      .getElementById(event)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
