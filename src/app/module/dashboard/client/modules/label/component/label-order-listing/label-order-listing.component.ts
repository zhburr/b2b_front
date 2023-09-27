import { Component, OnInit } from '@angular/core';
import { LabelOrder } from 'src/app/module/shared/interface/labelOrder.type';
import { TableOrderby } from 'src/app/module/shared/interface/tableOrderBy.type';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { LabelService } from '../../service/label.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-label-order-listing',
  templateUrl: './label-order-listing.component.html',
  styleUrls: ['./label-order-listing.component.scss'],
})
export class LabelOrderListingComponent
  extends BaseComponent
  implements OnInit
{
  tableOrder: TableOrderby = {
    HeaderIndex: 0,
    Sort: AppConstants.DEC,
  };

  labelOrderList: LabelOrder[] = [];

  constructor(
    private sharedService: SharedService,
    private labelService: LabelService
  ) {
    super();
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
      {
        field: 'inputFile',
        text: 'Order file',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'weight_from',
        text: 'Weight from',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'weight_to',
        text: 'Weight to',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'quantity',
        text: 'Quantity',
        type: AppConstants.TEXT,
        sortable: false,
      },
      {
        field: 'price',
        text: 'Payment',
        type: AppConstants.TEXT,
        sortable: false,
      },
      {
        field: 'outputFile',
        text: 'Label file',
        type: AppConstants.TEXT,
        sortable: true,
      }
    );

    this.initializeTable();
    await this.getLabelOrderList();
  }

  initializeTable() {
    this.tableData = {
      showSearch: true,
      tableHeader: this.tableHeader,
      tableBody: this.labelOrderList,
      showActions: true,
    };
  }

  tableCallBack(event: any) {
    switch (event.key) {
      case AppConstants.DOWNLOAD:
        if (!event.object.outputFile) {
          this.sharedService.downloadFile(
            AppConstants.LABEL_FILE_URL + event.object.inputFile
          );
        } else {
          Swal.fire({
            title: 'Download',
            icon: 'question',
            confirmButtonText: 'Order file',
            showCancelButton: true,
            cancelButtonText: 'Label file',
            allowOutsideClick: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.sharedService.downloadFile(
                AppConstants.LABEL_FILE_URL + event.object.inputFile
              );
            } else {
              if (result.dismiss !== Swal.DismissReason.backdrop)
                this.sharedService.downloadFile(
                  AppConstants.LABEL_FILE_URL + event.object.outputFile
                );
            }
          });
        }
        break;

      default:
        break;
    }
  }

  async getLabelOrderList() {
    try {
      const res: ApiResponse<LabelOrder[]> =
        await this.labelService.getLabelOrderList(
          this.sharedService.userData$.value.email!
        );

      if (res.Succeed) {
        this.labelOrderList = res.Content;
        this.labelOrderList = this.labelOrderList.map((line) => {
          return { ...line, tableActions: { canDownload: true } };
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
