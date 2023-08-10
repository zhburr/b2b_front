import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interface/user.type';
import { AppConstants } from '../utilities/app-constants';
import jwt_decode from 'jwt-decode';
@Injectable({ providedIn: 'root' })
export class SharedService {
  apiStack: any[] = [];
  userData$: BehaviorSubject<User> = new BehaviorSubject<User>({});
  constructor(private toastr: ToastrService) {}

  showSuccessToast(msg: string) {
    this.toastr.success(msg);
  }
  showErrorToast(msg: string) {
    this.toastr.error(msg);
  }
  showInfoToast(msg: string) {
    this.toastr.info(msg);
  }
  showWarningToast(msg: string) {
    this.toastr.warning(msg);
  }

  decodeJwtToken() {
    const token = localStorage.getItem('token')!;
    const payload = jwt_decode(token);
    this.userData$.next(payload!);
  }

  /**
   * This method verifies all the fields that are required in a form.
   * @param file
   * @returns
   */
  downloadFile(file: string) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', file);
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
