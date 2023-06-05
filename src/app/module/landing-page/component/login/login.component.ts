import { Component } from '@angular/core';
import { LandingService } from '../../services/landing.service';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { SharedService } from 'src/app/module/shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent {
  email: string = '';
  password: string = '';
  forgetEmail: string = '';
  showModal = false;

  constructor(
    private landingService: LandingService,
    private sharedService: SharedService
  ) {
    super();
  }

  async login() {
    const res: any = await this.landingService.login(this.email, this.password);
    if (res.Succeed) {
      console.log('login sucessful');
      this.navigate('/dashboard');
    } else {
      this.sharedService.showErrorToast(res.message);
    }
  }

  async sendForgetPasswordEmail() {
    const res: any = await this.landingService.sendEmailForgetPassword(
      this.forgetEmail
    );
    if (res.Succeed) {
      this.sharedService.showSuccessToast(
        `Reset password email has been sent to ${this.forgetEmail}`
      );
      document.getElementById('clode-modal')!.click();
    } else {
      this.sharedService.showErrorToast(res.message);
    }
  }
}
