import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/module/shared/services/http.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpService) {}

  uploadOrder(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPLOAD_ORDER_LISTING, payload);
  }

  getUserOrderList() : Promise<any>{
    return this.http.get(AppConstants.GET_USER_ORDER_LIST)
  }

  getOrderById(orderId:number):Promise<any>{
    return this.http.get(`${AppConstants.GET_ORDER_BY_ID}?orderId=${orderId}`)
  }
}
