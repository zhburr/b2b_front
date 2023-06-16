import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/utilities/base.component';
import { SharedService } from '../shared/services/shared.service';
import { Roles } from '../shared/interface/role.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private sharedService: SharedService) {}
  clientSideNavPages: any[] = [
    {
      Id: 1,
      Code: 'ADMIN',
      Active: true,
      NameEn: 'Product',
      Icon: 'inventory_2',
      MasterPageId: 0,
      IsMaster: true,
      CanRead: true,
      CanWrite: true,
      ChildPages: [
        {
          Id: 4,
          Code: 'USERS',
          Active: true,
          NameEn: 'Listing',
          PageName: 'dashboard/client/product/listing',
          Icon: 'reorder',
          MasterPageId: 1,
          IsMaster: false,
          CanRead: true,
          CanWrite: true,
        },
        {
          Id: 5,
          Code: 'SYSPARAMS',
          Active: true,
          NameEn: 'Upload',
          PageName: 'dashboard/client/product/upload',
          Icon: 'upload',
          MasterPageId: 1,
          IsMaster: false,
          CanRead: true,
          CanWrite: true,
        },
      ],
    },
  ];

  adminSideNavPages: any[] = [
    {
      Id: 1,
      Code: 'ADMIN',
      Active: true,
      NameEn: 'Product',
      Icon: 'inventory_2',
      MasterPageId: 0,
      IsMaster: true,
      CanRead: true,
      CanWrite: true,
      ChildPages: [
        {
          Id: 4,
          Code: 'USERS',
          Active: true,
          NameEn: 'Approval',
          PageName: 'dashboard/admin/product/approval',
          Icon: 'check_circle',
          MasterPageId: 1,
          IsMaster: false,
          CanRead: true,
          CanWrite: true,
        },
      ],
    },
  ];

  getSideNavPage() {
    if (this.sharedService.userData$.value.role === Roles.Admin) {
      return this.adminSideNavPages;
    } else if (this.sharedService.userData$.value.role === Roles.Client) {
      return this.clientSideNavPages;
    } else {
      return [];
    }
  }

  profileRoute() {
    if (this.sharedService.userData$.value.role === Roles.Admin) {
      return '/dashboard/admin/profile';
    } else if (this.sharedService.userData$.value.role === Roles.Client) {
      return '/dashboard/client/profile';
    } else {
      return '';
    }
  }
}
