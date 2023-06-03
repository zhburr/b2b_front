import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './component/home/home.component';
import { LnavbarComponent } from './component/lnavbar/lnavbar.component';
import { LmainComponent } from './component/lmain/lmain.component';
import { LaboutComponent } from './component/labout/labout.component';
import { LteamComponent } from './component/lteam/lteam.component';
import { LprocessComponent } from './component/lprocess/lprocess.component';
import { LcontactComponent } from './component/lcontact/lcontact.component';
import { LserviceComponent } from './component/lservice/lservice.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    HomeComponent,
    LnavbarComponent,
    LmainComponent,
    LaboutComponent,
    LteamComponent,
    LprocessComponent,
    LcontactComponent,
    LserviceComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [CommonModule, LandingPageRoutingModule, SharedModule],
})
export class LandingPageModule {}
