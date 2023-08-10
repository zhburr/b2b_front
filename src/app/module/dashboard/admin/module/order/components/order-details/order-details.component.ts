import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderLines } from 'src/app/module/shared/interface/order-line.type';
import { Order } from 'src/app/module/shared/interface/order-listing.type';
import { TableOrderby } from 'src/app/module/shared/interface/tableOrderBy.type';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { OrderService } from '../../services/order.service';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent extends BaseComponent implements OnInit {
  orderId?: number;
  orderDetail: Order = {};
  orderLinesList: OrderLines[] = [];
  tableOrder: TableOrderby = {
    HeaderIndex: 1,
    Sort: AppConstants.ASC,
  };

  processChanges!: Function;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private sharedService: SharedService
  ) {
    super();
    this.orderId = Number(route.snapshot.paramMap.get('Id'));
    console.log(this.orderId);
    if (!this.orderId) this.back();

    this.processChanges = this.debounce((event: string) => {
      this.updateOrderLine(event), 2000;
    });
  }

  ngOnInit(): void {
    this.initializePage();
    this.getOrderById();
  }

  initializePage() {
    this.buttons.push(
      {
        type: AppConstants.INFO,
        text: 'Download',
        minWidth: '100%',
      },
      {
        type: AppConstants.SUCCESS,
        text: 'Save',
        minWidth: '100%',
      },
      {
        type: AppConstants.SUCCESS,
        text: 'View invoice',
        minWidth: '100%',
      }
    );

    this.tableHeader.push(
      {
        field: 'productSku',
        text: 'Product SKU',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'productQuantity',
        text: 'Product quantity',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'buyerName',
        text: 'Buyer name',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'buyerCountry',
        text: 'Buyer country',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'buyerCity',
        text: 'Buyer city',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'buyerPostCode',
        text: 'Buyer postcode',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'buyerAddress1',
        text: 'Buyer address 1',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'buyerAddress2',
        text: 'Buyer address 2',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'trackingCompany',
        text: 'Tracking Company',
        type: AppConstants.INPUT,
        sortable: false,
      },
      {
        field: 'trackingNo',
        text: 'Tracking no',
        type: AppConstants.INPUT,
        sortable: false,
      }
    );

    this.initializeTable();
  }

  initializeTable() {
    this.tableData = {
      showSearch: true,
      tableHeader: this.tableHeader,
      tableBody: this.orderLinesList,
      showActions: false,
    };
  }

  async getOrderById() {
    try {
      const res: ApiResponse<Order> = await this.orderService.getOrderById(
        this.orderId!
      );
      console.log(res);
      if (res.Succeed) {
        this.orderDetail = res.Content;
        this.orderLinesList = this.orderDetail.OrderLine!;
        this.initializeTable();
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message!);
    }
  }

  tableCallBack(event: any) {
    if (event.key === AppConstants.INPUT) {
      this.processChanges(event.object);
    }
  }

  buttonCallback(event: any) {
    console.log(event);

    switch (event) {
      case 0:
        if (!this.orderDetail.invoice) {
          this.orderService.downloadOrderLine(
            this.orderDetail.OrderLine!,
            this.orderId!
          );
        } else {
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
              this.orderService.downloadOrderLine(
                this.orderDetail.OrderLine!,
                this.orderId!
              );
            } else {
              if (result.dismiss !== Swal.DismissReason.backdrop)
                this.sharedService.downloadFile(
                  `${AppConstants.INVOICE_FILE_URL}${this.orderDetail.invoice}`
                );
            }
          });
        }
        break;
      case 1:
        this.updateOrder();
        break;
      case 2:
        this.navigate(`dashboard/admin/order/invoice/${this.orderId}`);
        break;

      default:
        break;
    }
  }

  async updateOrder() {
    try {
      const data = {
        paid: this.orderDetail.paid,
        delivered: this.orderDetail.delivered,
        orderId: this.orderId,
      };
      const res: ApiResponse<string> = await this.orderService.updateOrder(
        data
      );

      if (res.Succeed) {
        this.getOrderById();
        this.sharedService.showSuccessToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message!);
    }
  }

  async updateOrderLine(event: any) {
    console.log(event);

    const orderLine: OrderLines = event as OrderLines;
    try {
      const data = {
        orderLineId: orderLine.id,
        trackingNo: orderLine.trackingNo ?? '',
        trackingCompany: orderLine.trackingCompany ?? '',
      };
      console.log(data);

      const res: ApiResponse<string> = await this.orderService.updateOrderLine(
        data
      );

      if (res.Succeed) {
        console.log(this.orderLinesList);

        this.sharedService.showSuccessToast(res.message!);
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message!);
    }
  }
}
