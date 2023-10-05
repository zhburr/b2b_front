import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../utilities/base.component';
import { AppConstants } from '../../utilities/app-constants';
import { TableOrderby } from '../../interface/tableOrderBy.type';
import * as moment from 'moment';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ApiResponse } from '../../interface/response.type';
import { Payment } from '../../interface/payment.type';
import { ValidatorService } from '../../utilities/validator.service';
import { User } from '../../interface/user.type';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends BaseComponent implements OnInit {
  tableOrder: TableOrderby = {
    HeaderIndex: 0,
    Sort: AppConstants.DEC,
  };

  startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  userEmail: string | undefined;

  paymentList: Payment[] = [];

  myModal: boolean = false;
  modalHeight: string = 'auto';
  modalMaxHeight: string = 'calc(70% + 10rem)';

  newPayment: Partial<Payment> = {};

  paymentType = ['Credit', 'Debit'];
  user: User = {};

  constructor(
    public sharedService: SharedService,
    private route: ActivatedRoute,
    private http: HttpService,
    private validatorService: ValidatorService,
    private router: Router
  ) {
    super();
    if (this.sharedService.userData$.value.role === 'Admin') {
      this.userEmail = route.snapshot.paramMap.get('email')!;
    } else {
      this.userEmail = this.sharedService.userData$.value.email;
    }

    if (this.router.getCurrentNavigation()?.extras?.state) {
      let data: any = this.router.getCurrentNavigation()?.extras?.state;
      this.user = data.data;
    } else {
      if (router.url.includes('users')) {
        this.back();
      }
    }
  }

  ngOnInit(): void {
    this.initializeHeader();
    this.initializeTableData();
    this.getPaymentList(this.startDate, this.endDate, this.userEmail!);
  }

  initializeHeader() {
    this.tableHeader.push(
      {
        field: 'createdAt',
        text: 'Date',
        type: AppConstants.DATE,
        sortable: true,
      },
      {
        field: 'paymentType',
        text: 'Payment Type',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'description',
        text: 'Description',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'amount',
        text: 'Amount',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'availableBalance',
        text: 'Available Balance',
        type: AppConstants.TEXT,
        sortable: true,
      }
    );

    this.buttons.push(
      {
        text: 'Add',
        type: AppConstants.SUCCESS,
      },
      {
        text: 'Save',
        type: AppConstants.SUCCESS,
      },
      {
        text: 'Cancel',
        type: AppConstants.DANGER,
      }
    );
  }

  initializeTableData() {
    this.tableData = {
      showSearch: true,
      tableHeader: this.tableHeader,
      tableBody: this.paymentList,
      showActions: false,
    };
  }

  dateChange(event: any) {
    this.getPaymentList(event.startDate, event.endDate, this.userEmail!);
  }

  async getPaymentList(startDate: string, endDate: string, email: string) {
    try {
      const data = {
        email,
        startDate,
        endDate,
      };
      const res: ApiResponse<Payment[]> = await this.http.post(
        AppConstants.GET_PAYMENT_LIST,
        data
      );
      if (res.Succeed) {
        this.paymentList = res.Content;
        this.initializeTableData();
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  async buttonCallback(event: any) {
    switch (event) {
      case 0:
        this.newPayment = {};
        this.myModal = true;
        break;

      case 1:
        await this.addPayment();
        this.myModal = false;
        break;

      case 2:
        this.myModal = false;
        break;

      default:
        break;
    }
  }

  async addPayment() {
    try {
      const data = {
        email: this.userEmail,
        paymentType: this.newPayment.paymentType,
        description: this.newPayment.description,
        amount: this.newPayment.amount,
      };

      await this.validatorService.validateRequired(
        [
          ['paymentType', 'Payment type'],
          ['description', 'Description'],
          ['amount', 'Amount'],
        ],
        data
      );

      const res: ApiResponse<null> = await this.http.post(
        AppConstants.ADD_PAYMENT,
        data
      );

      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message!);
        await this.getPaymentList(
          this.startDate,
          this.endDate,
          this.userEmail!
        );
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }
}
