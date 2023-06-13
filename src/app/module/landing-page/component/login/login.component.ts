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
    try {
      const res: any = await this.landingService.login(
        this.email,
        this.password
      );
      if (res.Succeed) {
        this.navigate('/dashboard');
      } else {
        this.sharedService.showErrorToast(res.message);
        if (res.message === 'Verify your account first') {
          this.navigate('verify/' + this.email);
        }
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  async sendForgetPasswordEmail() {
    try {
      const res: any = await this.landingService.sendEmailForgetPassword(
        this.forgetEmail
      );
      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message);
        document.getElementById('clode-modal')!.click();
      } else {
        this.sharedService.showErrorToast(res.message);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }
}
