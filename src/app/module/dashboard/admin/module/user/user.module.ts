import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserProductComponent } from './components/user-product/user-product.component';
import { UserListingComponent } from './components/users/user-listing/user-listing.component';
import { SharedModule } from 'src/app/module/shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    UserListingComponent,
    UsersComponent,
    UserDetailsComponent,
    UserProductComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
