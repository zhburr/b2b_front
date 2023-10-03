import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { LandingService } from '../../services/landing.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/module/shared/services/shared.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent extends BaseComponent {
  otpValue: string = '';
  email: string = '';
  demail: string = '';
  constructor(
    private landingService: LandingService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {
    super();
    this.email = this.route.snapshot.paramMap.get('email')!;
    this.demail = this.landingService.partiallyHideEmail(this.email);
  }
  async OTPInput() {
    let array: any = [];
    const inputs: any = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) {
      array.push(inputs[i].value);
    }
    this.otpValue = array.join('');
    await this.verifyEmail(this.otpValue);
  }

  gotoNext(nextId: string, event: any, previousId?: any) {
    console.log({ nextId, event, previousId });
    if (event.keyCode === 8) {
      document.getElementById(previousId)?.focus();
    } else {
      document.getElementById(nextId)?.focus();
    }
  }

  async verifyEmail(otp: string) {
    try {
      const res: any = await this.landingService.verifyEmail({
        email: this.email,
        otp,
      });
      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message);
        this.navigate('/login');
      } else {
        this.sharedService.showErrorToast(res.message);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error);
    }
  }
}
