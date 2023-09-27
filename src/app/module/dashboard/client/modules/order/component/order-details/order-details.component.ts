import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/module/shared/interface/order-listing.type';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { OrderService } from '../../services/order.service';
import { OrderLines } from 'src/app/module/shared/interface/order-line.type';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { TableOrderby } from 'src/app/module/shared/interface/tableOrderBy.type';

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
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private sharedService: SharedService
  ) {
    super();
    this.orderId = Number(route.snapshot.paramMap.get('Id'));
    if (!this.orderId) this.back();
  }

  ngOnInit(): void {
    this.initializePage();
    this.getOrderById();
  }

  initializePage() {
    this.tableHeader.push(
      {
        field: 'id',
        text: 'Order id',
        type: AppConstants.TEXT,
        sortable: true,
      },
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
        text: 'Tracking company',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'trackingNo',
        text: 'Tracking no.',
        type: AppConstants.TEXT,
        sortable: true,
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

  tableCallBack(event: any) {}

  async getOrderById() {
    try {
      const res: ApiResponse<Order> = await this.orderService.getOrderById(
        this.orderId!
      );
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
}
