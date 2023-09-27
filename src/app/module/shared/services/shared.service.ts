import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interface/user.type';
import { AppConstants } from '../utilities/app-constants';
import jwt_decode from 'jwt-decode';
import { ApiResponse } from '../interface/response.type';
import { HttpService } from './http.service';
@Injectable({ providedIn: 'root' })
export class SharedService {
  apiStack: any[] = [];
  userData$: BehaviorSubject<User> = new BehaviorSubject<User>({});
  constructor(private toastr: ToastrService, private http: HttpService) {}

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
    const token = this.accessToken!;
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

  async getUserData() {
    try {
      const res: ApiResponse<User> = await this.http.get(
        AppConstants.GET_USER_DATA + `?email=${this.userData$.value.email!}`
      );

      if (res.Succeed) {
        this.userData$.next(res.Content);
        if (res.Content.access_toke) {
          if (localStorage.getItem('stay') === 'true') {
            localStorage.setItem('token', this.userData$.value.access_toke!);
          } else {
            sessionStorage.setItem('token', this.userData$.value.access_toke!);
          }
        }
      }
    } catch (error: any) {
      this.showErrorToast(error.message);
    }
  }

  get accessToken() {
    console.log(
      localStorage.getItem('stay') === 'true'
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token')
    );

    return localStorage.getItem('stay') === 'true'
      ? localStorage.getItem('token')
      : sessionStorage.getItem('token');
  }
}
