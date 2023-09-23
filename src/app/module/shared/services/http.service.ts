import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../utilities/app-constants';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}
  get(url: any): Promise<any> {
    return firstValueFrom(this.http.get(AppConstants.baseUrl + url));
  }
  post(url: any, body: any): Promise<any> {
    return firstValueFrom(
      this.http.post(AppConstants.baseUrl + url, body, {
        responseType: 'json',
      })
    );
  }

  put(url: any, body: any) {
    return firstValueFrom(
      this.http.post(AppConstants.baseUrl + url, body, { responseType: 'json' })
    );
  }
  patch(url: any, body: any) {
    return firstValueFrom(
      this.http.patch(AppConstants.baseUrl + url, body, {
        responseType: 'json',
      })
    );
  }
  delete(url: any, body?: any) {
    return firstValueFrom(this.http.delete(AppConstants.baseUrl + url, body));
  }
  fetchFile(url: any) {
    const headers = new HttpHeaders({
      Accept: 'text/csv',
    });
    const options = { headers };
    return this.http.post(url, null, options);
  }
  setHttpParems(params: any) {
    let url = '';
    if (params) {
      const limit = params.count !== -1 ? `&limit=${params.count}` : '';
      url = `?start=${params.start}${limit}${
        params.attribute &&
        '&order_by=' + params.attribute + ':' + params.order_by
      }${params.search && '&' + params.field + ':like=' + params.search}`;
    }
    return url;
  }
}
