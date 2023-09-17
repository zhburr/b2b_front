import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { User } from 'src/app/module/shared/interface/user.type';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { UserService } from '../../../service/user.service';
import { SharedService } from 'src/app/module/shared/services/shared.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss'],
})
export class UserListingComponent extends BaseComponent implements OnInit {
  @Output() user: EventEmitter<User> = new EventEmitter();
  usersList: User[] = [];

  constructor(
    private userService: UserService,
    private shareService: SharedService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeHeaders();
    this.initializeDataTable();
    this.getAllUsers();
  }

  initializeHeaders() {
    this.tableHeader.push({
      field: 'fullName',
      text: 'Users',
      type: AppConstants.TEXT,
      sortable: true,
    });
  }

  initializeDataTable() {
    this.tableData = {
      showSearch: true,
      tableHeader: this.tableHeader,
      tableBody: this.usersList,
      showDetails: false,
      showDelete: false,
    };
  }

  tableCallback(event: any) {
    console.log(event);
    if ((event.object as User) !== undefined)
      this.user.emit(event.object as User);
  }

  async getAllUsers() {
    try {
      const res: ApiResponse<User[]> = await this.userService.getAllUsers();
      console.log(res);
      if (res.Succeed) {
        this.usersList = res.Content.map((user) => {
          return { ...user, fullName: `${user.firstName} ${user.lastName}` };
        });
        this.initializeDataTable();
      } else {
        this.shareService.showErrorToast(res.message!);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
