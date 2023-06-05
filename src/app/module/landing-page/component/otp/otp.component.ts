import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { LandingService } from '../../services/landing.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent extends BaseComponent {
  otpValue: string = '';

  constructor(private landingService: LandingService) {
    super();
  }
  async OTPInput() {
    let array: any = [];
    const inputs: any = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) {
      array.push(inputs[i].value);
    }
    this.otpValue = array.join('');

    let user = JSON.parse(localStorage.getItem('user')!);
    console.log(user);

    if (user.otp == this.otpValue) {
      const res: any = await this.landingService.verifyEmail(user.email);
      if (res.Succeed) {
        localStorage.setItem('user', JSON.stringify(res.Content));
        this.navigate('/login');
      }
    }
  }
}
