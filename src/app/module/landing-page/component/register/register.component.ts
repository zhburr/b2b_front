import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  asClient: boolean = true;
  asCustomer: boolean = false;

  registerAs: string[] = ['Client', 'Customer'];
  selectedValue: string = 'Client';

  selectionChange(event: any) {
    console.log(event);
  }

  changed(event: any) {
    if (this.selectedValue === 'Client') {
      this.asClient = true;
      this.asCustomer = false;
    } else {
      this.asClient = false;
      this.asCustomer = true;
    }
  }
}
