import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { OrderService } from '../../services/order.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { Order } from 'src/app/module/shared/interface/order-listing.type';
import { TableOrderby } from 'src/app/module/shared/interface/tableOrderBy.type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss'],
})
export class OrderListingComponent extends BaseComponent implements OnInit {
  @ViewChild('formFile') fileInput?: ElementRef;
  fileToUpload: File | null = null;
  orderListing: Order[] = [];
  tableOrder: TableOrderby = {
    HeaderIndex: 3,
    Sort: AppConstants.DEC,
  };
  constructor(
    private sharedService: SharedService,
    private orderService: OrderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializePage();
  }

  async initializePage() {
    this.buttons.push({
      text: 'Upload',
      type: AppConstants.SUCCESS,
    });

    this.tableHeader.push(
      {
        field: 'id',
        text: 'Order Id',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'csv',
        text: 'Order file',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'invoice',
        text: 'Invoice',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'createdAt',
        text: 'Date',
        type: AppConstants.DATE,
        sortable: true,
      },
      {
        field: 'paid',
        text: 'Paid',
        type: AppConstants.BADGE,
        sortable: false,
      }
    );

    this.initializeTable();
    await this.getUserOrderList();
  }

  initializeTable() {
    this.tableData = {
      showSearch: true,
      tableHeader: this.tableHeader,
      tableBody: this.orderListing,
      showActions: true,
    };
  }

  tableCallBack(event: any) {
    console.log(event);
    switch (event.key) {
      case AppConstants.VIEW:
        this.navigate(`dashboard/client/order/details/${event.object.id}`);
        break;

      case AppConstants.DOWNLOAD:
        if (event.object.invoice) {
          Swal.fire({
            title: 'Download',
            icon: 'question',
            confirmButtonText: 'Order file',
            showCancelButton: true,
            cancelButtonText: 'Invoice',
            allowOutsideClick: true,
          }).then((result) => {
            console.log(result);

            if (result.isConfirmed) {
              this.sharedService.downloadFile(
                `${AppConstants.ORDER_FILE_URL}${event.object.csv}`
              );
            } else {
              if (result.dismiss !== Swal.DismissReason.backdrop)
                this.sharedService.downloadFile(
                  `${AppConstants.INVOICE_FILE_URL}${event.object.invoice}`
                );
            }
          });
        } else {
          this.sharedService.downloadFile(
            `${AppConstants.ORDER_FILE_URL}${event.object.csv}`
          );
        }
        break;

      default:
        break;
    }
  }

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
    try {
      const res: ApiResponse<{}> = await this.orderService.uploadOrder(
        formData
      );
      console.log(res);

      if (res.Succeed) {
        this.resetFileInput();
        this.sharedService.showSuccessToast(res.message!);
        await this.getUserOrderList();
      } else {
        this.resetFileInput();
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  async getUserOrderList() {
    try {
      const res: ApiResponse<Order[]> =
        await this.orderService.getUserOrderList();
      if (res.Succeed) {
        this.orderListing = res.Content;
        this.orderListing = this.orderListing.map((order) => {
          return {
            ...order,
            tableActions: { canView: true, canDownload: true },
          };
        });
        this.initializeTable();
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }
}
