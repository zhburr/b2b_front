import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    ScrollingModule,
    MatButtonModule,
    FormsModule,
    LazyLoadImageModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ScrollingModule,
    LazyLoadImageModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
})
export class SharedModule {
  static injector: Injector;
  constructor(injector: Injector) {
    SharedModule.injector = injector;
  }
}
