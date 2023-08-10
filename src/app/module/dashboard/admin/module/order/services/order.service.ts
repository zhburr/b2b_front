import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/module/shared/services/http.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { Row, Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { OrderLines } from 'src/app/module/shared/interface/order-line.type';
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

  getAllPendingOrderList(): Promise<any> {
    return this.http.get(AppConstants.GET_PENDING_ORDER_LIST);
  }

  getOrderById(orderId: number): Promise<any> {
    return this.http.get(`${AppConstants.GET_ORDER_BY_ID}?orderId=${orderId}`);
  }

  getInvoiceDataByOrderId(orderId: number): Promise<any> {
    return this.http.get(`${AppConstants.GET_INVOICE_DATA}?orderId=${orderId}`);
  }

  downloadOrderLine(orderLine: OrderLines[], orderId: number) {
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.columns = [
      { header: 'Name', key: 'buyerName', width: 15 },
      { header: 'Address1`', key: 'buyerAddress1', width: 20 },
      { header: 'Address2`', key: 'buyerAddress2', width: 20 },
      { header: 'Country`', key: 'buyerCountry', width: 20 },
      { header: 'City`', key: 'buyerCity', width: 20 },
      { header: 'Postcode`', key: 'buyerPostCode', width: 10 },
      { header: 'Product SKU', key: 'productSku', width: 20 },
      { header: 'Product quantity', key: 'productQuantity', width: 10 },
      { header: 'Product location', key: 'productlocation', width: 20 },
    ];

    orderLine.forEach((row) => {
      const newRow = { ...row, productlocation: row.product?.location };
      worksheet.addRow(newRow);
    });

    const postcodes: { [postcode: string]: Row[] } = {};
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const postcode = row.getCell('buyerPostCode').value as string;
      if (postcodes[postcode]) {
        postcodes[postcode].push(row);
      } else {
        postcodes[postcode] = [row];
      }
    });

    // Apply highlighting to rows with the same postcode
    Object.values(postcodes).forEach((rows) => {
      if (rows.length > 1) {
        rows.forEach((row) => {
          row.eachCell((cell) => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFF0000' },
            };
          });
        });
      }
    });

    // Get the buffer data and save the file
    workbook.xlsx
      .writeBuffer()
      .then((data) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const title = 'output'; // Set the desired title here
        fs.saveAs(blob, orderId + '.xlsx');
        console.log('Excel file created and saved successfully.');
      })
      .catch((error) => {
        console.error('Error creating Excel file:', error);
      });
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
}
