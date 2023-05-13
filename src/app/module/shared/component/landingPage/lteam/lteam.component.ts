import { Component } from '@angular/core';

@Component({
  selector: 'app-lteam',
  templateUrl: './lteam.component.html',
  styleUrls: ['./lteam.component.scss'],
})
export class LteamComponent {
  tabs: any = {
    mission: true,
    whyUs: false,
    promise: false,
    weDo: false,
  };

  changeTab(type: any) {
    Object.keys(this.tabs).forEach((res: any) => {
      this.tabs[res] = res === type;
    });
  }
}
