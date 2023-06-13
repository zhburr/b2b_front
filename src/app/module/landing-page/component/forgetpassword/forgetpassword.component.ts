import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingService } from '../../services/landing.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent extends BaseComponent {
  resetPasswordForm!: FormGroup;
  otp: string = '';
  email: string = '';
  constructor(
    private fb: FormBuilder,
    private landingService: LandingService,
    private route: ActivatedRoute,
    private shareService: SharedService
  ) {
    super();
    this.otp = this.route.snapshot.paramMap.get('otp')!;
    this.email = this.route.snapshot.paramMap.get('email')!;
    this.initializeForm();
  }

  initializeForm() {
    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  get resetPasswordFormValue() {
    return this.resetPasswordForm.controls;
  }

  async resetPassword() {
    try {
      const res: any = await this.landingService.resetPassword({
        otp: this.otp,
        email: this.email,
        password: this.resetPasswordFormValue['password'].value,
      });

      if (res.Succeed) {
        this.shareService.showSuccessToast(res.message);
        this.navigate('/login');
      } else {
        this.shareService.showErrorToast(res.message);
      }
    } catch (error: any) {
      this.shareService.showErrorToast(error.message);
    }
  }
}
