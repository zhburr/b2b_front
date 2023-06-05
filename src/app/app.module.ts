import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './module/shared/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { Interceptor } from './module/shared/interceptor/interceptor';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    NgxLoadingModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
