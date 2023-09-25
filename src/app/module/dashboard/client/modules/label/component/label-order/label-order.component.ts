import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../service/label.service';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { Postage } from 'src/app/module/shared/interface/postage.model';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';

@Component({
  selector: 'app-label-order',
  templateUrl: './label-order.component.html',
  styleUrls: ['./label-order.component.scss'],
})
export class LabelOrderComponent implements OnInit {
  selectedWeightIndex: number = 0;
  labelPricesList: Postage[] = [];
  numberOfOrder: number = 0;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private labelService: LabelService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getAllLabelPrice();
  }

  selecteWeight(event: number) {
    this.selectedWeightIndex = event;
    console.log(event);
  }

  async getAllLabelPrice() {
    try {
      const res: ApiResponse<Postage[]> =
        await this.labelService.getAllLabelPrice();
      if (res.Succeed) {
        this.labelPricesList = res.Content;
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  private initConfig(price: string, quantity: string): void {
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
                value: price,
                breakdown: {
                  item_total: {
                    currency_code: 'GBP',
                    value: price,
                  },
                },
              },
              items: [
                {
                  name: 'Print label',
                  quantity: quantity,
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'GBP',
                    value: price,
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
      onClientAuthorization: async (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        // this.buttonCallback(0);
        this.sharedService.showSuccessToast(
          'Payment sucessful.You will receive an email from us soon.'
        );

        // await this.listingRemovalEmail();
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
