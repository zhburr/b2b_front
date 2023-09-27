import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/module/shared/services/http.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(private http: HttpService) {}

  getAllLabelPrice(): Promise<any> {
    return this.http.get(AppConstants.GET_ALL_LABEL_PRICE);
  }

  getLabelOrderList(email: string): Promise<any> {
    return this.http.get(AppConstants.GET_LABEL_ORDER_LIST + `?email=${email}`);
  }

  createLabelOrder(payload: any): Promise<any> {
    return this.http.post(AppConstants.CREATE_ORDER_LABEL, payload);
  }
}
