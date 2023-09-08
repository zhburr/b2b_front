import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { User } from 'src/app/module/shared/interface/user.type';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { UserService } from '../../../service/user.service';
import { SharedService } from 'src/app/module/shared/services/shared.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent extends BaseComponent implements OnInit {
  @Input() user: User = {};

  constructor(
    private userService: UserService,
    private sharedService: SharedService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buttons.push({
      type: AppConstants.SUCCESS,
      text: 'Save',
    });
  }

  goToPage(page: string) {
    this.navigate(page, this.user);
  }

  async updateUser() {
    try {
      const data = {
        selectedUserId: this.user.id,
        selectedUserVat: this.user.isVat ?? false,
        selecteUserBalance: this.user.balance ?? 0,
        selectedUserCanUploadOrder: this.user.canUploadOrder,
      };

      const res: ApiResponse<User> = await this.userService.updateUser(data);
      if (res.Succeed) {
        this.user = res.Content;
        this.sharedService.showSuccessToast(res.message!);
      }
    } catch (error) {}
  }
}
