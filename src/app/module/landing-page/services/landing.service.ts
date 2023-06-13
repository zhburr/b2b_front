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

  verifyEmail(payload: { email: string; otp: string }): Promise<any> {
    return this.http.post(AppConstants.VERIFY_EMAIL, payload);
  }

  sendEmailForgetPassword(email: string): Promise<any> {
    return this.http.get(
      `${AppConstants.EMAIL_FORGET_PASSWORD}?email=${email}`
    );
  }
  resetPassword(payload: any): Promise<any> {
    return this.http.post(AppConstants.RESET_PASSWORD, payload);
  }

  partiallyHideEmail(email: string) {
    return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2');
  }
}
