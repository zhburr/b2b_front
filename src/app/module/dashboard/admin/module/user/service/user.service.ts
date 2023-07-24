import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/module/shared/services/http.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  getAllUsers(): Promise<any> {
    return this.http.get(AppConstants.GET_ALL_USERS);
  }

  getSelectedUserProduct(payload: any): Promise<any> {
    return this.http.post(
      AppConstants.GET_PRODUCT_LISTING_OF_SELECTED_USER,
      payload
    );
  }

  updateUser(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPDATE_USER, payload);
  }

  updateUserProductByAdmin(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPDATE_USER_PRODUCT_BY_ADMIN, payload);
  }
}
