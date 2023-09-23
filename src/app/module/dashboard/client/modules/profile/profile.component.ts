import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { ValidatorService } from 'src/app/module/shared/utilities/validator.service';
import { ProfileService } from './service/profile.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { User } from 'src/app/module/shared/interface/user.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent implements OnInit {
  appConstants = AppConstants;
  modalHeight: string = 'auto';
  modalMaxHeight: string = 'calc(70% + 10rem)';
  updatePasswordModal: boolean = false;

  updatePasswordObj: Partial<{
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  }> = {};

  user: Partial<User> = {};
  fileToUpload: File | null = null;

  constructor(
    public sharedService: SharedService,
    private validatorService: ValidatorService,
    private profileService: ProfileService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeButtons();
    this.getUserData();
  }

  initializeButtons() {
    this.buttons.push(
      {
        type: AppConstants.PRIMARY,
        text: 'Update password',
      },
      {
        type: AppConstants.SUCCESS,
        text: 'Update',
      },
      {
        type: AppConstants.DANGER,
        text: 'Cancel',
      }
    );
  }

  openFileInput() {
    document.getElementById('file')?.click();
  }

  checkFile(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);

    if (!this.fileToUpload) {
      this.fileToUpload = null;
      this.user.avatar = null;
      return;
    }

    this.convertToDataUrl(this.fileToUpload!);

    if (!this.fileToUpload?.name) {
      this.sharedService.showErrorToast('File name is required');
      this.fileToUpload = null;
      this.user.avatar = null;
    }
  }

  async updateNewPassword() {
    try {
      await this.validatorService.validateRequired(
        [
          ['password', 'Password'],
          ['newPassword', 'New password'],
          ['confirmNewPassword', 'Confirm new password'],
        ],
        this.updatePasswordObj
      );

      await this.validatorService.validatePassword(
        [['newPassword', 'New password']],
        this.updatePasswordObj
      );

      if (
        !this.updatePasswordObj.newPassword?.match(
          /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
        )
      ) {
        throw new Error(
          'Password should be an alphanumeric and contains a special character.'
        );
      }

      if (
        this.updatePasswordObj.newPassword !==
        this.updatePasswordObj.confirmNewPassword
      ) {
        throw new Error('Password does not match.');
      }

      const data = {
        currentPassword: this.updatePasswordObj.password,
        newPassword: this.updatePasswordObj.newPassword,
        email: this.sharedService.userData$.value.email,
      };
      const res: ApiResponse<null> = await this.profileService.updatePassword(
        data
      );

      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message!);
        this.updatePasswordModal = false;
        this.updatePasswordObj = {};
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  async getUserData() {
    try {
      const res: ApiResponse<User> = await this.profileService.getUserData(
        this.sharedService.userData$.value.email!
      );

      if (res.Succeed) {
        this.user = res.Content;
        this.sharedService.userData$.next(this.user);
        if (this.user.access_toke) {
          localStorage.setItem('token', this.user.access_toke);
        }
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  convertToDataUrl(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      this.user.avatar = reader.result;
    };

    reader.readAsDataURL(file);
  }

  async uploadImage() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload!, this.fileToUpload!.name);
    formData.append('email', this.sharedService.userData$.value.email!);
    try {
      const res: ApiResponse<null> = await this.profileService.uploadUserImage(
        formData
      );
      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message!);
        this.fileToUpload = null;
        await this.getUserData();
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }
}
