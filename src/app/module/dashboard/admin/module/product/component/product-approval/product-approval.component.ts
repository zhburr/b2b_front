import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';

@Component({
  selector: 'app-product-approval',
  templateUrl: './product-approval.component.html',
  styleUrls: ['./product-approval.component.scss'],
})
export class ProductApprovalComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    this.initializePage();
  }

  initializeTable() {
    this.tableData = {
      showSearch: true,
      tableHeader: this.tableHeader,
      tableBody: [],
      showActions: false,
    };
  }

  initializePage() {
    this.tableHeader.push(
      {
        field: '',
        text: 'User',
        type: AppConstants.TEXT,
        sortable: true,
      },
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
}
