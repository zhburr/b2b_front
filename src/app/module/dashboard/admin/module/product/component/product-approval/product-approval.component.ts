import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { AdminProductService } from '../../service/admin-product.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { ProductApproval } from 'src/app/module/shared/interface/productApproval.type';
import { ProductStatus } from 'src/app/module/shared/enum/productApprovalStatus.enum';
import Swal from 'sweetalert2';
import { TableOrderby } from 'src/app/module/shared/interface/tableOrderBy.type';

@Component({
  selector: 'app-product-approval',
  templateUrl: './product-approval.component.html',
  styleUrls: ['./product-approval.component.scss'],
})
export class ProductApprovalComponent extends BaseComponent implements OnInit {
  approvalListing: ProductApproval[] = [];
  tableOrder: TableOrderby = {
    HeaderIndex: 2,
    Sort: AppConstants.ASC,
  };
  constructor(
    private sharedService: SharedService,
    private productService: AdminProductService
  ) {
    super();
  }
  ngOnInit(): void {
    this.initializePage();
    this.getAllProductsApproval();
  }

  initializeTable() {
    this.tableData = {
      showSearch: true,
      tableHeader: this.tableHeader,
      tableBody: this.approvalListing,
      showActions: true,
    };
  }

  initializePage() {
    this.tableHeader.push(
      {
        field: 'user',
        subField: 'name',
        text: 'User',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'csv',
        text: 'File',
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
        field: 'status',
        text: 'Status',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: 'remarks',
        text: 'Remarks',
        type: AppConstants.TEXT,
        sortable: true,
      }
    );

    this.initializeTable();
  }

  async getAllProductsApproval() {
    try {
      const res: ApiResponse<ProductApproval[]> =
        await this.productService.getAllProductsApproval();
      if (res.Succeed) {
        this.approvalListing = res.Content.map((list) => {
          return {
            ...list,
            user: {
              ...list.user,
              name: list.user.firstName + ' ' + list.user.lastName,
            },
            tableActions: {
              canDownload: true,
              canApprove: list.status === ProductStatus.Pending,
              canReject: list.status === ProductStatus.Pending,
            },
          };
        });

        this.initializeTable();
      }
    } catch (error) {}
  }

  async tableCallBack(event: any) {
    switch (event.key) {
      case AppConstants.DOWNLOAD:
        this.downloadProductFile(event.object.csv);
        break;
      case AppConstants.APPROVE:
        Swal.fire({
          title: 'Do you want to add remarks?',
          icon: 'question',
          showCancelButton: true,
          cancelButtonText: 'No',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          allowOutsideClick: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { value: text } = await Swal.fire({
              input: 'textarea',
              inputLabel: 'Add remarks',
              inputPlaceholder: 'Type your remarks here',
              inputAttributes: {
                'aria-label': 'Type your remarks here',
              },
              allowOutsideClick: false,
            });

            await this.updateProductApprovalStatus(
              event.object.id,
              ProductStatus.Approved,
              text
            );
          } else {
            await this.updateProductApprovalStatus(
              event.object.id,
              ProductStatus.Approved,
              ''
            );
          }
        });

        break;
      case AppConstants.REJECT:
        Swal.fire({
          title: 'Do you want to add remarks?',
          icon: 'question',
          showCancelButton: true,
          cancelButtonText: 'No',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          allowOutsideClick: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { value: text } = await Swal.fire({
              input: 'textarea',
              inputLabel: 'Add remarks',
              inputPlaceholder: 'Type your remarks here',
              inputAttributes: {
                'aria-label': 'Type your remarks here',
              },
              allowOutsideClick: false,
            });

            await this.updateProductApprovalStatus(
              event.object.id,
              ProductStatus.Rejected,
              text
            );
          } else {
            await this.updateProductApprovalStatus(
              event.object.id,
              ProductStatus.Rejected,
              ''
            );
          }
        });

        break;
    }
  }

  downloadProductFile(file: string) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', `${AppConstants.PRODUCT_FILE_URL}${file}`);
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async updateProductApprovalStatus(
    id: number,
    status: string,
    remarks: string
  ) {
    try {
      const data = { id, status, remarks };
      const res: ApiResponse<{}> =
        await this.productService.updateProductApprovalStatus(data);
      if (res.Succeed) {
        this.getAllProductsApproval();
        this.sharedService.showSuccessToast(res.message!);
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error) {}
  }
}
