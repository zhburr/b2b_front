import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { OtpComponent } from './component/otp/otp.component';
import { TermsAndConditionComponent } from './component/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { LandingPageComponent } from './landing-page.component';

const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'verify/:email',
        component: OtpComponent,
      },
      {
        path: 'terms-and-condition',
        component: TermsAndConditionComponent,
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'reset-password/:otp/:email',
        component: ForgetpasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
