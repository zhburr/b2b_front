import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/module/shared/services/http.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
// import { Row, Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { OrderLines } from 'src/app/module/shared/interface/order-line.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpService, private httpclient: HttpClient) {}

  getAllPostage(): Promise<any> {
    return this.http.get(AppConstants.GET_ALL_POSTAGE);
  }

  upsertPostage(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPSERT_POSTAGE, payload);
  }

  getAllPendingOrderList(): Promise<any> {
    return this.http.get(AppConstants.GET_PENDING_ORDER_LIST);
  }

  getUserOrders(email: string): Promise<any> {
    return this.http.get(`${AppConstants.GET_USER_ORDERS}?email=${email}`);
  }

  getOrderById(orderId: number): Promise<any> {
    return this.http.get(`${AppConstants.GET_ORDER_BY_ID}?orderId=${orderId}`);
  }

  getInvoiceDataByOrderId(orderId: number): Promise<any> {
    return this.http.get(`${AppConstants.GET_INVOICE_DATA}?orderId=${orderId}`);
  }

  downloadExcel(orderId: any) {
    this.downloadExcelFile(orderId).subscribe((data: Blob) => {
      console.log(data);

      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${orderId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  downloadExcelFile(orderId: any): Observable<Blob> {
    console.log('in here');

    // Set headers to indicate that we expect a blob (binary data) in response
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Make a GET request to the backend endpoint
    return this.httpclient.get(
      AppConstants.baseUrl +
        'order/getOrderLineExcelFile' +
        `?orderId=${orderId}`,
      {
        responseType: 'blob', // Specify the response type as a blob
        headers: headers,
      }
    );
  }

  uploadInvoice(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPLOAD_INVOICE, payload);
  }

  updateOrder(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPDATE_ORDER, payload);
  }

  updateOrderLine(payload: any): Promise<any> {
    return this.http.post(AppConstants.UPDATE_ORDER_LINE, payload);
  }

  addOrderTracking(payload: any): Promise<any> {
    return this.http.post(AppConstants.ADD_ORDER_LINE_TRACKING, payload);
  }
}
