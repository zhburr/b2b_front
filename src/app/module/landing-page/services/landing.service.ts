import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { AppConstants } from '../../shared/utilities/app-constants';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  constructor(private http: HttpService) {}

  registerUser(user: any): Promise<any> {
    return this.http.post(AppConstants.REGISTER_USER, user);
  }

  login(email: string, password: string): Promise<any> {
    return this.http.post(AppConstants.LOGIN, { email, password });
  }

  verifyEmail(email: string): Promise<any> {
    console.log(email);

    return this.http.get(`${AppConstants.VERIFY_EMAIL}?email=${email}`);
  }

  sendEmailForgetPassword(email: string): Promise<any> {
    return this.http.get(
      `${AppConstants.EMAIL_FORGET_PASSWORD}?email=${email}`
    );
  }
  resetPassword(payload: any): Promise<any> {
    return this.http.post(AppConstants.RESET_PASSWORD, payload);
  }
}
