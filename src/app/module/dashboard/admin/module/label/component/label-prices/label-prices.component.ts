import { Component, OnInit } from '@angular/core';
import { Postage } from 'src/app/module/shared/interface/postage.model';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { TableOrderby } from 'src/app/module/shared/interface/tableOrderBy.type';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { OrderService } from '../../../order/services/order.service';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { ValidatorService } from 'src/app/module/shared/utilities/validator.service';
import { LabelService } from '../../service/label.service';

@Component({
  selector: 'app-label-prices',
  templateUrl: './label-prices.component.html',
  styleUrls: ['./label-prices.component.scss'],
})
export class LabelPricesComponent extends BaseComponent implements OnInit {
  postageListing: Postage[] = [];
  myModal: boolean = false;
  modalHeight: string = 'auto';
  modalMaxHeight: string = 'calc(70% + 10rem)';
  selectedPostage: Postage = {};
  orderBy: TableOrderby = {
    HeaderIndex: 0,
    Sort: AppConstants.ASC,
  };

  constructor(
    private labelService: LabelService,
    private sharedService: SharedService,
    private validatorService: ValidatorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializePage();
    this.getAllPostage();
  }

  initializePage() {
    this.buttons.push(
      {
        type: AppConstants.SUCCESS,
        text: 'Add',
      },
      {
        type: AppConstants.SUCCESS,
        text: 'Save',
      },
      {
        type: AppConstants.DANGER,
        text: 'Cancel',
      }
    );

    this.tableHeader.push(
      {
        field: 'weight_from',
        text: 'Weight From (Kg)',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'weight_to',
        text: 'Weight to (Kg)',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'price',
        text: 'Price',
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
      tableBody: this.postageListing,
      showActions: true,
    };
  }

  buttonCallback(event: any) {
    switch (event) {
      case 0:
        // on click add
        this.selectedPostage = {};
        this.myModal = true;
        break;
      case 1:
        // on click save modal
        this.upsertPostage(this.selectedPostage);
        break;
      case 2:
        // on click cancel modal
        this.myModal = false;
        this.selectedPostage = {};
        break;
      default:
        break;
    }
  }

  tableCallback(event: any) {
    if (event.key === AppConstants.EDIT) {
      this.selectedPostage = JSON.parse(JSON.stringify(event.object));
      this.myModal = true;
    }
  }

  async getAllPostage() {
    try {
      const res: ApiResponse<Postage[]> =
        await this.labelService.getAllLabelPrice();

      if (res.Succeed) {
        this.postageListing = res.Content;
        this.postageListing = this.postageListing.map((postage) => {
          return { ...postage, tableActions: { canEdit: true } };
        });
        this.initializeTable();
      }
    } catch (error) {}
  }

  async upsertPostage(dto: Postage) {
    try {
      const data = {
        weightFrom: Number(this.selectedPostage.weight_from),
        weightTo: Number(this.selectedPostage.weight_to),
        price: Number(this.selectedPostage.price),
        id: this.selectedPostage.id ?? 0,
      };

      await this.validatorService.validateRequired(
        [
          ['weightFrom', 'Wieght from'],
          ['weightTo', 'Weight to'],
          ['price', 'Price'],
        ],
        data
      );

      await this.validatorService.validateGreaterThanZero(
        [
          ['weightFrom', 'Weight from'],
          ['weightTo', 'Weight to'],
          ['price', 'Price'],
        ],
        data
      );

      const res: ApiResponse<Postage> =
        await this.labelService.upsertLabelPrice(data);

      if (res.Succeed) {
        this.myModal = false;
        this.selectedPostage = {};
        await this.getAllPostage();
        this.sharedService.showSuccessToast(res.message!);
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(
        error.message ?? 'Something went wrong. Please try again'
      );
    }
  }
}
