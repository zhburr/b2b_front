import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Paypal } from 'src/app/module/shared/interface/paypal.type';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { ValidatorService } from 'src/app/module/shared/utilities/validator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  removalModal: boolean = false;
  modalHeight: string = 'auto';
  modalMaxHeight: string = 'calc(70% + 10rem)';
  paypalForm: Paypal = {};
  isPaypalFormaValidated: boolean = false;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private validatorService: ValidatorService,
    private sharedService: SharedService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buttons.push({
      text: 'Close',
      type: AppConstants.DANGER,
    });
  }

  gotoView(event: string) {
    if (event === 'listing_removal') {
      this.removalModal = true;
      this.paypalForm = {};
      this.isPaypalFormaValidated = false;
      document.body.style.overflowY = 'hidden';
    } else {
      document
        .getElementById(event)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async buttonCallback(event: any) {
    switch (event) {
      case 0:
        this.removalModal = false;
        document.body.style.overflowY = 'auto';
        this.paypalForm = {};
        this.isPaypalFormaValidated = false;
        break;
      case 1:
        await this.validatePaypalForm();
        break;

      default:
        break;
    }
  }

  async validatePaypalForm() {
    try {
      await this.validatorService.validateRequired(
        [
          ['name', 'Name'],
          ['email', 'Email'],
          ['marketplace', 'Marketplace name'],
          ['productURL', 'Product URL'],
          ['productName', 'Product name'],
          ['meeting', 'Meeting date'],
        ],
        this.paypalForm
      );

      await this.validatorService.validateEmail(
        [['email', 'Email']],
        this.paypalForm
      );

      this.isPaypalFormaValidated = true;
      this.initConfig();
    } catch (error: any) {
      this.sharedService.showErrorToast(
        error.message ?? 'Fill all required fields'
      );
    }
  }

  onPaymentComplete(event: any) {
    console.log(event);
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'GBP',
      clientId: AppConstants.PAYPAL_CLIENT_ID,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'GBP',
                value: '35',
                breakdown: {
                  item_total: {
                    currency_code: 'GBP',
                    value: '35',
                  },
                },
              },
              items: [
                {
                  name: 'One to one call for listing removal',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'GBP',
                    value: '35',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.buttonCallback(0);
        this.sharedService.showSuccessToast(
          'Payment sucessful.You will receive an email from us soon.'
        );
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.sharedService.showErrorToast('Try again later.');
        // this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        this.sharedService.showErrorToast('Try again later.');

        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }
}
