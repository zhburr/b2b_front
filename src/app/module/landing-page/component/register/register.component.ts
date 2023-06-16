import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LandingService } from '../../services/landing.service';
import { Route, Router } from '@angular/router';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { User } from 'src/app/module/shared/interface/user.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  asClient: boolean = true;
  asCustomer: boolean = false;

  registerAs: string[] = ['Client', 'Customer'];

  registerationForm!: FormGroup;
  user: User = {};
  constructor(
    private fb: FormBuilder,
    private landingService: LandingService,
    private sharedService: SharedService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      isVat: [false, Validators.required],
      registerAsa: ['Client', Validators.required],
    });
  }

  selectionChange(event: any) {
    console.log(event);
  }

  changed(event: any) {
    if (this.registerationForm.value.registerAsa === 'Client') {
      this.asClient = true;
      this.asCustomer = false;
    } else {
      this.asClient = false;
      this.asCustomer = true;
    }
  }

  async registeration() {
    const res: ApiResponse<User> = await this.landingService.registerUser(
      this.registerationForm.value
    );

    if (res.Succeed) {
      this.user = res.Content;
      this.navigate('verify/' + this.user.email);
      this.sharedService.showSuccessToast(res.message!);
    } else {
      this.sharedService.showErrorToast(res.message!);
    }
  }

  get registerationFormValue() {
    return this.registerationForm.controls;
  }
}
