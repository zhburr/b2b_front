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
import { NavbarComponent } from './component/navbar/navbar.component';
import { ButtonComponent } from './component/button/button.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { LabelComponent } from './component/label/label.component';
import { InputComponent } from './component/input/input.component';
import { TableComponent } from './component/table/table.component';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { ToggleComponent } from './component/toggle/toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchPipe } from './pipes/search/search.pipe';
import { OderByPipe } from './pipes/oderBy/oder-by.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
    ButtonComponent,
    SidebarComponent,
    LabelComponent,
    InputComponent,
    TableComponent,
    CheckboxComponent,
    ToggleComponent,
  ],
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
    MatExpansionModule,
    RouterModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
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
    NavbarComponent,
    ButtonComponent,
    SidebarComponent,
    MatExpansionModule,
    RouterModule,
    LabelComponent,
    InputComponent,
    TableComponent,
    CheckboxComponent,
    ToggleComponent,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [SearchPipe, OderByPipe],
})
export class SharedModule {
  static injector: Injector;
  constructor(injector: Injector) {
    SharedModule.injector = injector;
  }
}
