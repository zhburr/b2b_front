import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { AdminProductService } from '../../service/admin-product.service';

@Component({
  selector: 'app-product-approval',
  templateUrl: './product-approval.component.html',
  styleUrls: ['./product-approval.component.scss'],
})
export class ProductApprovalComponent extends BaseComponent implements OnInit {
  approvalListing: any[] = [];
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
      }
    );

    this.initializeTable();
  }

  async getAllProductsApproval() {
    try {
      const res: any = await this.productService.getAllProductsApproval();
      console.log(res);
      if (res.Succeed) {
        this.approvalListing = res.Content.map((list: any) => {
          return {
            ...list,
            user: {
              ...list.user,
              name: list.user.firstName + ' ' + list.user.lastName,
            },
            tableActions: {
              canDownload: true,
              canApprove: true,
              canReject: true,
            },
          };
        });

        this.initializeTable();

        console.log(this.approvalListing);
      }
    } catch (error) {}
  }

  async tableCallBack(event: any) {
    if (event.key === AppConstants.DOWNLOAD) {
      this.downloadProductFile(event.object.csv);
    } else if (event.key === AppConstants.APPROVE) {
      await this.updateProductApprovalStatus(event.object.id, 'Approved');
    } else if (event.key === AppConstants.REJECT) {
      await this.updateProductApprovalStatus(event.object.id, 'Rejected');
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

  async updateProductApprovalStatus(id: number, status: string) {
    try {
      const data = { id, status };
      const res: any = await this.productService.updateProductApprovalStatus(
        data
      );
      if (res.Succeed) {
        this.getAllProductsApproval();
        this.sharedService.showSuccessToast(res.message);
      }
    } catch (error) {}
  }
}
