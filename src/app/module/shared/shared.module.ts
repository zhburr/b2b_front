import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnavbarComponent } from './component/landingPage/lnavbar/lnavbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LmainComponent } from './component/landingPage/lmain/lmain.component';
import { LaboutComponent } from './component/landingPage/labout/labout.component';
import { LprocessComponent } from './component/landingPage/lprocess/lprocess.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LserviceComponent } from './component/landingPage/lservice/lservice.component';
import { LteamComponent } from './component/landingPage/lteam/lteam.component';
import { LcontactComponent } from './component/landingPage/lcontact/lcontact.component';
@NgModule({
  declarations: [
    LnavbarComponent,
    LmainComponent,
    LaboutComponent,
    LprocessComponent,
    PageNotFoundComponent,
    LserviceComponent,
    LteamComponent,
    LcontactComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    ScrollingModule,
    MatButtonModule,
    NgbCarouselModule,
    FormsModule,
    LazyLoadImageModule,
  ],
  exports: [
    LnavbarComponent,
    LmainComponent,
    LaboutComponent,
    LprocessComponent,
    LserviceComponent,
    LteamComponent,
    LcontactComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgbCarouselModule,
    FormsModule,
    ScrollingModule,
    LazyLoadImageModule,
  ],
})
export class SharedModule {}
