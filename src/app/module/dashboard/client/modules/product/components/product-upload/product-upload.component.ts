import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { ProductService } from '../../service/product.service';
import { TableOrderby } from 'src/app/module/shared/interface/tableOrderBy.type';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss'],
})
export class ProductUploadComponent extends BaseComponent implements OnInit {
  @ViewChild('formFile') fileInput?: ElementRef;
  fileToUpload: File | null = null;
  listingApproval: any[] = [];
  tableOrder: TableOrderby = {
    HeaderIndex: 1,
    Sort: AppConstants.ASC,
  };
  constructor(
    private sharedService: SharedService,
    private productService: ProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializePage();
    this.getAllProductListing();
  }

  initializePage() {
    this.buttons.push({
      text: 'Upload',
      type: AppConstants.SUCCESS,
    });

    this.tableHeader.push(
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
        minWidth: '250px',
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
      tableBody: this.listingApproval,
      showActions: true,
    };
  }

  checkFile(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);

    if (!this.fileToUpload?.name) {
      this.sharedService.showErrorToast('File name is required');
      this.resetFileInput();
    } else if (
      !this.fileToUpload?.type
      // this.fileToUpload.type !== 'text/csv'
    ) {
      this.sharedService.showErrorToast(
        'Only file with extension CSV is allowed'
      );
      this.resetFileInput();
    }
  }

  resetFileInput() {
    this.fileInput!.nativeElement.value = '';
    this.fileToUpload = null;
  }

  async uploadProductListing() {
    try {
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload!, this.fileToUpload!.name);

      const res: any = await this.productService.uploadProductListing(formData);
      if (res.Succeed) {
        this.getAllProductListing();
        this.resetFileInput();
        this.sharedService.showSuccessToast(res.message);
      } else {
        this.resetFileInput();
        this.sharedService.showErrorToast(res.message);
      }
    } catch (error: any) {
      console.log('in catch', error);

      this.resetFileInput();
      this.sharedService.showErrorToast(
        error.error.message[0].constraints.isNotEmpty
      );
    }
  }

  async getAllProductListing() {
    try {
      const res: any = await this.productService.getAllProductsApproval();
      if (res.Succeed) {
        this.listingApproval = res.Content.map((list: any) => {
          return { ...list, tableActions: { canDownload: true } };
        });
        this.initializeTable();
      }
    } catch (error: any) {}
  }

  tableCallBack(event: any) {
    if (event.key === AppConstants.DOWNLOAD) {
      this.downloadProductFile(event.object.csv);
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
}
