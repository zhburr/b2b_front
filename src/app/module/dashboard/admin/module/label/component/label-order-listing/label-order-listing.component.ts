import { Component, OnInit } from '@angular/core';
import { LabelOrder } from 'src/app/module/shared/interface/labelOrder.type';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { LabelService } from '../../service/label.service';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { TableOrderby } from 'src/app/module/shared/interface/tableOrderBy.type';
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
  showAll: boolean = false;

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
        field: 'user',
        subField: 'name',
        text: 'User',
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
      case AppConstants.UPLOAD:
        Swal.fire({
          title: 'Upload file',
          input: 'file',
          showCancelButton: true,
          confirmButtonText: 'Upload',
          allowOutsideClick: false,
          showCloseButton: true,
        })
          .then(async (result) => {
            if (result.isConfirmed) {
              const formData: FormData = new FormData();
              formData.append('file', result.value, result.value.name);
              formData.append('labelId', event.object.id.toString());

              const res: ApiResponse<null> =
                await this.labelService.updateLabelOrder(formData);
              if (res.Succeed) {
                this.sharedService.showSuccessToast(res.message!);
                this.getLabelOrderList();
              } else {
                this.sharedService.showErrorToast(res.message!);
              }
            }
          })
          .catch((error) => {
            this.sharedService.showErrorToast(
              error.message! ?? 'Something went wrong.'
            );
          });
        break;

      default:
        break;
    }
  }

  async getLabelOrderList() {
    try {
      const res: ApiResponse<LabelOrder[]> =
        await this.labelService.getAllLabelOrderList({ all: this.showAll });

      if (res.Succeed) {
        this.labelOrderList = res.Content;
        this.labelOrderList = this.labelOrderList.map((line) => {
          return {
            ...line,
            user: { name: `${line.user?.firstName} ${line.user?.lastName}` },
            tableActions: {
              canDownload: true,
              canUpload: !line.outputFile,
            },
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

  changeShowAll(event: boolean) {
    this.showAll = event;
    this.getLabelOrderList();
  }
}
