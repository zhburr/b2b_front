import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/module/shared/interface/order-listing.type';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { TableOrderby } from 'src/app/module/shared/interface/tableOrderBy.type';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { OrderService } from '../../services/order.service';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { OrderLines } from 'src/app/module/shared/interface/order-line.type';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss'],
})
export class OrderListingComponent extends BaseComponent implements OnInit {
  orderListing: Order[] = [];
  tableOrder: TableOrderby = {
    HeaderIndex: 4,
    Sort: AppConstants.DEC,
  };
  userEmail: string | undefined;

  constructor(
    private orderService: OrderService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    super();
    this.userEmail = route.snapshot.paramMap.get('email')!;
  }

  ngOnInit(): void {
    this.initializePage();
  }

  async initializePage() {
    this.tableHeader.push(
      {
        field: 'id',
        text: 'Order Id',
        type: AppConstants.TEXT,
        sortable: true,
      },
      // {
      //   field: 'user',
      //   subField: 'name',
      //   text: 'User',
      //   type: AppConstants.TEXT,
      //   sortable: true,
      // },
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

    if (!this.userEmail) {
      this.tableHeader.splice(1, 0, {
        field: 'user',
        subField: 'name',
        text: 'User',
        type: AppConstants.TEXT,
        sortable: true,
      });
    }

    this.initializeTable();
    this.userEmail
      ? await this.getUserAllOrders(this.userEmail)
      : await this.getAllPendingOrderList();

    if (this.userEmail) this.tableOrder.HeaderIndex = 3;
  }

  initializeTable() {
    this.tableData = {
      showSearch: true,
      tableHeader: this.tableHeader,
      tableBody: this.orderListing,
      showActions: true,
    };
  }

  async tableCallBack(event: any) {
    switch (event.key) {
      case AppConstants.EDIT:
        this.navigate(`dashboard/admin/order/details/${event.object.id}`);
        break;

      case AppConstants.DOWNLOAD:
        let orderDetail = event.object as Order;
        if (!orderDetail.invoice) {
          this.orderService.downloadExcel(orderDetail.id!);
        } else {
          Swal.fire({
            title: 'Download',
            icon: 'question',
            confirmButtonText: 'Order file',
            showCancelButton: true,
            cancelButtonText: 'Invoice',
            allowOutsideClick: true,
          }).then(async (result) => {
            if (result.isConfirmed) {
              this.orderService.downloadExcel(orderDetail.id!);
            } else {
              if (result.dismiss !== Swal.DismissReason.backdrop)
                this.sharedService.downloadFile(
                  `${AppConstants.INVOICE_FILE_URL}${orderDetail.invoice}`
                );
            }
          });
        }
        break;

      default:
        break;
    }
  }

  async getAllPendingOrderList() {
    try {
      const res: ApiResponse<Order[]> =
        await this.orderService.getAllPendingOrderList();

      if (res.Succeed) {
        this.orderListing = res.Content;
        this.orderListing = this.orderListing.map((order) => {
          return {
            ...order,
            user: {
              ...order.user,
              name: `${order.user?.firstName} ${order.user?.lastName}`,
            },
            tableActions: { canEdit: true, canDownload: true },
          };
        });
        this.initializeTable();
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error) {
      this.sharedService.showErrorToast('Something went wrong.');
    }
  }

  async getUserAllOrders(email: string) {
    try {
      const res: ApiResponse<Order[]> = await this.orderService.getUserOrders(
        email
      );

      if (res.Succeed) {
        this.orderListing = res.Content;
        this.orderListing = this.orderListing.map((order) => {
          return {
            ...order,
            user: {
              ...order.user,
              name: `${order.user?.firstName} ${order.user?.lastName}`,
            },
            tableActions: { canEdit: true, canDownload: true },
          };
        });
        this.initializeTable();
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message!);
    }
  }
}
