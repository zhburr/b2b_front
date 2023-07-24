import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss'],
})
export class OrderListingComponent extends BaseComponent implements OnInit {
  @ViewChild('formFile') fileInput?: ElementRef;
  fileToUpload: File | null = null;
  orderListing: any[] = [];
  constructor(
    private sharedService: SharedService,
    private orderService: OrderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializePage();
  }

  initializePage() {
    this.buttons.push({
      text: 'Upload',
      type: AppConstants.SUCCESS,
    });

    this.tableHeader.push(
      {
        field: 'csv',
        text: 'File',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'createdAt',
        text: 'Date',
        type: AppConstants.DATE,
        sortable: true,
      }
    );

    this.initializeTable();
  }

  initializeTable() {
    this.tableData = {
      showSearch: true,
      tableHeader: this.tableHeader,
      tableBody: this.orderListing,
      showActions: true,
    };
  }

  tableCallBack(event: any) {}

  checkFile(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);

    if (!this.fileToUpload?.name) {
      this.sharedService.showErrorToast('File name is required');
      this.resetFileInput();
    } else if (
      !this.fileToUpload?.type
      // this.fileToUpload.type !== 'text/csv'
    ) {
      this.sharedService.showErrorToast(
        'Only file with extension CSV is allowed'
      );
      this.resetFileInput();
    }
  }

  resetFileInput() {
    this.fileInput!.nativeElement.value = '';
    this.fileToUpload = null;
  }

  async uploadOrderListing() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload!, this.fileToUpload!.name);

    const res: any = await this.orderService.uploadOrder(formData);
    console.log(res);

    if (res.Succeed) {
      this.resetFileInput();
      this.sharedService.showSuccessToast(res.message);
    } else {
      this.resetFileInput();
      this.sharedService.showErrorToast(res.message);
    }
  }

  // async uploadProductListing() {
  //   try {
  //     const formData: FormData = new FormData();
  //     formData.append('file', this.fileToUpload!, this.fileToUpload!.name);

  //     const res: any = await this.productService.uploadProductListing(formData);
  //     if (res.Succeed) {
  //       this.getAllProductListing();
  //       this.resetFileInput();
  //       this.sharedService.showSuccessToast(res.message);
  //     } else {
  //       this.resetFileInput();
  //       this.sharedService.showErrorToast(res.message);
  //     }
  //   } catch (error: any) {
  //     console.log('in catch', error);

  //     this.resetFileInput();
  //     this.sharedService.showErrorToast(
  //       error.error.message[0].constraints.isNotEmpty
  //     );
  //   }
  // }
}
