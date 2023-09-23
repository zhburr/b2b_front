import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/module/shared/services/http.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpService) {}

  updatePassword(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPDATE_PASSWORD, payload);
  }

  getUserData(email: string): Promise<any> {
    return this.http.get(`${AppConstants.GET_USER_DATA}?email=${email}`);
  }

  uploadUserImage(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPLOAD_USER_IMAGE, payload);
  }
}
