import { Component } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
  otpValue: string = '';

  OTPInput() {
    let array: any = [];
    const inputs: any = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) {
      array.push(inputs[i].value);
    }
    this.otpValue = array.join('');

    if (this.otpValue.length < 6) {
    } else {
    }
  }
}
