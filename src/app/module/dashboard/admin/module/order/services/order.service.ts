import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/module/shared/services/http.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpService) {}

  getAllPostage(): Promise<any> {
    return this.http.get(AppConstants.GET_ALL_POSTAGE);
  }

  upsertPostage(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPSERT_POSTAGE, payload);
  }
}
