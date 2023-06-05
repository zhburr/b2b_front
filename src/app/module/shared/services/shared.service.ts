import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class SharedService {
  apiStack: any[] = [];
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
}
