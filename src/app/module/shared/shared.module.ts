import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [PageNotFoundComponent],
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
