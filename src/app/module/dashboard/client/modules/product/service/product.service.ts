import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/module/shared/services/http.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpService) {}

  getAllProductsApproval(): Promise<any> {
    return this.http.get(AppConstants.ALL_PRODUCT_LISTING_OF_USER);
  }

  uploadProductListing(payload: any) {
    return this.http.post(AppConstants.UPLOAD_PRODUCT_LISTING, payload);
  }
}
