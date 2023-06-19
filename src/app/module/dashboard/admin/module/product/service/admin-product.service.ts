import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/module/shared/services/http.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  constructor(private http: HttpService) {}

  getAllProductsApproval(): Promise<any> {
    return this.http.get(AppConstants.ALL_USER_PRODUCT_LISTING);
  }
  updateProductApprovalStatus(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPDATE_PRODUCT_LISTING_STATUS, payload);
  }
}
