import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { DecimalPipe } from '@angular/common';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { User } from 'src/app/module/shared/interface/user.type';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { OrderLines } from 'src/app/module/shared/interface/order-line.type';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss'],
})
export class OrderInvoiceComponent extends BaseComponent implements OnInit {
  @ViewChild('orderInvoice', { static: true }) template?: ElementRef;
  orderId?: number;
  invoice: any;
  userData: User = {};
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private sharedService: SharedService,
    private deciamlPipe: DecimalPipe
  ) {
    super();
    this.orderId = Number(route.snapshot.paramMap.get('Id'));
    console.log(this.orderId);
    if (!this.orderId) this.back();

    this.sharedService.userData$.value.isVat;
  }

  ngOnInit(): void {
    this.getInvoiceData();
    this.initializePage();
  }

  initializePage() {
    this.buttons.push({
      type: AppConstants.SUCCESS,
      text: 'Send Invoice',
    });
  }

  async getInvoiceData() {
    try {
      const res: ApiResponse<{ invoiceData: OrderLines[]; userData: User }> =
        await this.orderService.getInvoiceDataByOrderId(this.orderId!);
      console.log(res);

      if (res.Succeed) {
        this.invoice = res.Content.invoiceData;
        this.userData = res.Content.userData;
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  get pickAndPack() {
    return this.deciamlPipe.transform(this.invoice.length * 0.3, '1.2-2');
  }

  get subtotalOfInvoice() {
    return this.deciamlPipe.transform(
      this.invoice.reduce((acc: number, value: any) => {
        return acc + Number(value.totalPrice);
      }, 0) + Number(this.pickAndPack),
      '1.2-2'
    );
  }

  get tax() {
    return this.deciamlPipe.transform(
      (Number(this.subtotalOfInvoice) / 100) * 20,
      '1.2-2'
    );
  }

  get total() {
    // return this.userData.isVat
    //   ? this.deciamlPipe.transform(
    //       Number(this.subtotalOfInvoice) + Number(this.tax),
    //       '1.2-2'
    //     )
    //   : this.subtotalOfInvoice;

    return this.deciamlPipe.transform(
      Number(this.subtotalOfInvoice) + Number(this.tax),
      '1.2-2'
    );
  }

  sendInvoice() {
    const element = this.template!.nativeElement;
    html2canvas(element, { useCORS: true })
      .then(async (canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const pdfBlob = pdf.output('blob');
        const formData = new FormData();
        formData.append('file', pdfBlob, 'invoice.pdf');
        formData.append('totalAmount', this.total!.toString());
        formData.append('orderId', this.orderId!.toString());

        const res: ApiResponse<string> = await this.orderService.uploadInvoice(
          formData
        );

        if (res.Succeed) {
          this.sharedService.showSuccessToast(res.message!);
          this.back();
        } else {
          this.sharedService.showErrorToast(res.message!);
        }
      })
      .catch((error) => {
        this.sharedService.showErrorToast(error.message);
      });
  }
}
