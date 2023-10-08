import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('formFile') fileInput?: ElementRef;

  selectedWeightIndex: number = 0;
  labelPricesList: Postage[] = [];
  numberOfOrder: number = 0;
  labelUpdatePrice: number = 0;
  fileToUpload: File | null = null;
  isPaypalFormaValidated: boolean = false;
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

        await this.createLabelOrder();
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

  async placeOrder() {
    try {
      if (!this.fileToUpload) {
        throw new Error('Select a file to continue.');
      }

      if (this.numberOfOrder <= 0) {
        throw new Error('Number of order should be greater than zero.');
      }

      this.isPaypalFormaValidated = true;
      this.labelUpdatePrice =
        this.labelPricesList[this.selectedWeightIndex].price! *
        this.numberOfOrder;
      this.initConfig(
        this.labelUpdatePrice.toString(),
        this.numberOfOrder.toString()
      );
      // await this.createLabelOrder();
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  async createLabelOrder() {
    try {
      const formData = new FormData();
      formData.append('file', this.fileToUpload!, this.fileToUpload!.name);
      formData.append(
        'userId',
        this.sharedService.userData$.value.id!.toString()
      );
      formData.append(
        'weight_from',
        this.labelPricesList[this.selectedWeightIndex].weight_from!.toString()
      );
      formData.append(
        'weight_to',
        this.labelPricesList[this.selectedWeightIndex].weight_to!.toString()
      );
      formData.append('quantity', this.numberOfOrder.toString());
      formData.append('price', this.labelUpdatePrice.toString());
      const res: ApiResponse<null> = await this.labelService.createLabelOrder(
        formData
      );

      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message!);
        this.labelUpdatePrice = 0;
        this.selectedWeightIndex = 0;
        this.numberOfOrder = 0;
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  checkFile(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);

    if (!this.fileToUpload?.name) {
      this.sharedService.showErrorToast('File name is required');
      this.resetFileInput();
    }
  }

  resetFileInput() {
    this.fileInput!.nativeElement.value = '';
    this.fileToUpload = null;
  }
}
