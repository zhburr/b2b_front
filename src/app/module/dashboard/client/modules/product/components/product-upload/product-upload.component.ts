import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss'],
})
export class ProductUploadComponent extends BaseComponent implements OnInit {
  @ViewChild('formFile') fileInput?: ElementRef;
  fileToUpload: File | null = null;
  constructor(private sharedService: SharedService) {
    super();
  }

  ngOnInit(): void {
    this.initializePage();
  }

  initializePage() {
    this.buttons.push({
      text: 'Upload',
      type: AppConstants.SUCCESS,
    });

    this.tableHeader.push(
      {
        field: '',
        text: 'File',
        type: AppConstants.TEXT,
        sortable: true,
      },
      {
        field: '',
        text: 'Date',
        type: AppConstants.DATE,
        sortable: true,
      },
      {
        field: '',
        text: 'Status',
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
      tableBody: [],
      showActions: false,
    };
  }

  checkFile(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);

    if (!this.fileToUpload?.name) {
      this.sharedService.showErrorToast('File name is required');
      this.resetFileInput();
    } else if (!this.fileToUpload?.type) {
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
}
