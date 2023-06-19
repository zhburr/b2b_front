import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class Interceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private shared: SharedService // private auth: AuthService,
  ) {}
  /**
   * This method intercepts all the requests and appends the authentication header in them.
   *
   * @param request
   * @param next
   * @returns
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('undefined')) {
      this.shared.showErrorToast(
        'The resource you are trying to access does not exist!'
      );
      return throwError(
        'The resource you are trying to access does not exist!'
      );
    }
    this.shared.apiStack.push(request);

    this.loaderService.show();

    if (!request.url.includes('auth')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.shared.apiStack.pop();
        if (this.shared.apiStack.length === 0) this.loaderService.hide();
      }),
      catchError((error: HttpErrorResponse) => {
        // let errorMsg = '';
        // if (error.status === 401) {
        //   this.shared.showErrorToast('Session has expired. ');
        // }
        // if (error.error.text) {
        //   errorMsg = error.error.text;
        // } else if (error.error.Message) {
        //   errorMsg = error.error.Message;
        // }
        // this.shared.showErrorToast(errorMsg);
        // return throwError(errorMsg);
        return throwError(error);
      })
    );
  }
}
