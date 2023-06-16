import { Component } from '@angular/core';

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
  constructor() {}

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
    document
      .getElementById(event)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
