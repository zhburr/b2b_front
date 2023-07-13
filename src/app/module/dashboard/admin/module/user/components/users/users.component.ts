import { Component } from '@angular/core';
import { User } from 'src/app/module/shared/interface/user.type';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  selectedUser: User = {};
}
