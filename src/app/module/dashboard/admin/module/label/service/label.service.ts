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

  upsertLabelPrice(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPSERT_LABEL_PRICE, payload);
  }
}
