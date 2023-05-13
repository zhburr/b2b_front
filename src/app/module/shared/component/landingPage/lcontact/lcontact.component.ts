import { Component } from '@angular/core';

@Component({
  selector: 'app-lcontact',
  templateUrl: './lcontact.component.html',
  styleUrls: ['./lcontact.component.scss'],
})
export class LcontactComponent {
  href: string = '';
  msg: string = '';

  getHref() {
    let newMsg = this.msg.replace(/ /g, '%20');
    this.href = `https://wa.me/447411455885?text=${newMsg}`;
    this.msg = '';
  }
}
