import { Component } from '@angular/core';
import { LandingService } from '../../services/landing.service';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { User } from 'src/app/module/shared/interface/user.type';
import { Roles } from 'src/app/module/shared/interface/role.model';
import { LoaderService } from 'src/app/module/shared/services/loader.service';

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
  rememberMe: boolean = false;

  constructor(
    private landingService: LandingService,
    private sharedService: SharedService,
    private loaderService: LoaderService
  ) {
    super();
  }

  async login() {
    try {
      const res: ApiResponse<User> = await this.landingService.login(
        this.email,
        this.password
      );
      if (res.Succeed) {
        localStorage.setItem('stay', this.rememberMe ? 'true' : 'false');
        if (res.Content.access_toke)
          localStorage.setItem('token', res.Content.access_toke!);

        if (res.Content.role === Roles.Client) {
          this.navigate('/dashboard/client');
        } else if (res.Content.role === Roles.Admin) {
          this.navigate('/dashboard/admin');
        } else if (res.Content.role === Roles.Customer) {
          this.navigate('/dashboard/customer');
        }

        this.sharedService.userData$.next(res.Content);
      } else {
        this.sharedService.showErrorToast(res.message!);
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
