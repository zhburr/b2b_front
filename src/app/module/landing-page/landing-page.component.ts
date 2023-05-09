import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  tabs: any = {
    mission: true,
    whyUs: false,
    promise: false,
    weDo: false,
  };
  href: string = '';
  msg: string = '';
  aboutUsReadmore: boolean = false;
  constructor(
    caruselConfig: NgbCarouselConfig,
    private scroller: ViewportScroller
  ) {
    caruselConfig.interval = 10000;
    caruselConfig.animation = true;
    caruselConfig.pauseOnHover = true;
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    const verticalOffset =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (verticalOffset > 100) {
      document.getElementById('lnavbar')!.style.padding = '2rem 5rem';
      document.getElementById('lnavbar')!.style.borderBottom =
        '1px solid lightgrey';
    } else {
      document.getElementById('lnavbar')!.style.padding = '2.5rem 5rem';
      document.getElementById('lnavbar')!.style.borderBottom = 'none';
    }
  }

  changeTab(type: any) {
    Object.keys(this.tabs).forEach((res: any) => {
      this.tabs[res] = res === type;
    });
  }

  getHref() {
    let newMsg = this.msg.replace(/ /g, '%20');
    this.href = `https://wa.me/923364671219?text=${newMsg}`;
    this.msg = '';
  }

  gotoView(event: string) {
    document
      .getElementById(event)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
