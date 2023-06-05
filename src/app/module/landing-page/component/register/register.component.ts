import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LandingService } from '../../services/landing.service';
import { Route, Router } from '@angular/router';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';

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
  user: any = {};
  constructor(private fb: FormBuilder, private landingService: LandingService) {
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
    console.log(this.registerationForm.value);
    const res: any = await this.landingService.registerUser(
      this.registerationForm.value
    );
    if (res.Succeed) {
      this.user = res.Content;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.navigate('verify/' + this.user.email);
    } else {
    }
  }

  get registerationFormValue() {
    return this.registerationForm.controls;
  }
}
