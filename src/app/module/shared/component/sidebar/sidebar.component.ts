import { Component, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { AppConstants } from '../../utilities/app-constants';
import { BaseComponent } from '../../utilities/base.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent {
  @Input() sideNav: any[] = [];
  @Input() profile: string = '';
  // sideNav: any[] = [
  //   {
  //     Id: 1,
  //     Code: 'ADMIN',
  //     Active: true,
  //     NameEn: 'Product',
  //     Icon: 'inventory_2',
  //     MasterPageId: 0,
  //     IsMaster: true,
  //     CanRead: true,
  //     CanWrite: true,
  //     ChildPages: [
  //       {
  //         Id: 4,
  //         Code: 'USERS',
  //         Active: true,
  //         NameEn: 'Listing',
  //         PageName: 'dashboard/client/product/listing',
  //         Icon: 'reorder',
  //         MasterPageId: 1,
  //         IsMaster: false,
  //         CanRead: true,
  //         CanWrite: true,
  //       },
  //       {
  //         Id: 5,
  //         Code: 'SYSPARAMS',
  //         Active: true,
  //         NameEn: 'Upload',
  //         PageName: 'dashboard/client/product/upload',
  //         Icon: 'upload',
  //         MasterPageId: 1,
  //         IsMaster: false,
  //         CanRead: true,
  //         CanWrite: true,
  //       },
  //     ],
  //   },
  //   // {
  //   //   Id: 2,
  //   //   Code: 'ENTITY',
  //   //   Active: true,
  //   //   NameFr: 'Entité',
  //   //   PageName: '/entity',
  //   //   NameEn: 'Entity',
  //   //   Icon: 'home',
  //   //   MasterPageId: 0,
  //   //   IsMaster: true,
  //   //   CanRead: true,
  //   //   CanWrite: true,
  //   // },
  //   // {
  //   //   Id: 3,
  //   //   Code: 'STONE_MANAGE',
  //   //   Active: true,
  //   //   NameFr: 'Gestion des pierres',
  //   //   NameEn: 'Stone Management',
  //   //   Icon: 'dashboard',
  //   //   MasterPageId: 0,
  //   //   IsMaster: true,
  //   //   CanRead: true,
  //   //   CanWrite: true,
  //   //   ChildPages: [
  //   //     {
  //   //       Id: 8,
  //   //       Code: 'QUALIFIERS_VALUES',
  //   //       Active: true,
  //   //       NameFr: 'Valeurs qualificatifs',
  //   //       NameEn: 'Qualifiers values',
  //   //       PageName: '/stone/qualifiers-values',
  //   //       Icon: 'star',
  //   //       MasterPageId: 1,
  //   //       IsMaster: false,
  //   //       CanRead: true,
  //   //       CanWrite: true,
  //   //     },
  //   //     {
  //   //       Id: 9,
  //   //       Code: 'QUALIFIERS',
  //   //       Active: true,
  //   //       NameFr: 'Qualificatifs',
  //   //       NameEn: 'Qualifiers',
  //   //       PageName: '/stone/qualifiers',
  //   //       Icon: 'star',
  //   //       MasterPageId: 1,
  //   //       IsMaster: false,
  //   //       CanRead: true,
  //   //       CanWrite: true,
  //   //     },

  //   //     {
  //   //       Id: 6,
  //   //       Code: 'TYPEOFSTONE',
  //   //       Active: true,
  //   //       NameFr: 'Type de pierre',
  //   //       NameEn: 'Type of stone',
  //   //       PageName: '/stone/typeOfStone',
  //   //       Icon: 'landscape',
  //   //       MasterPageId: 1,
  //   //       IsMaster: false,
  //   //       CanRead: true,
  //   //       CanWrite: true,
  //   //     },
  //   //     {
  //   //       Id: 7,
  //   //       Code: 'DEFAULTS',
  //   //       Active: true,
  //   //       NameFr: 'Défauts',
  //   //       NameEn: 'Defects',
  //   //       PageName: '/stone/defaults',
  //   //       Icon: 'report',
  //   //       MasterPageId: 1,
  //   //       IsMaster: false,
  //   //       CanRead: true,
  //   //       CanWrite: true,
  //   //     },

  //   //     {
  //   //       Id: 9,
  //   //       Code: 'D_COMBINE',
  //   //       Active: true,
  //   //       NameFr: 'Combinaisons de défauts',
  //   //       NameEn: 'Defaults combine',
  //   //       PageName: '/stone/defaultsCombine',
  //   //       Icon: 'join_full',
  //   //       MasterPageId: 1,
  //   //       IsMaster: false,
  //   //       CanRead: true,
  //   //       CanWrite: true,
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   Id: 4,
  //   //   Code: 'ERROR_MANAGE',
  //   //   Active: true,
  //   //   NameFr: 'Gestion des erreurs',
  //   //   NameEn: 'Error Management',
  //   //   Icon: 'settings',
  //   //   MasterPageId: 0,
  //   //   IsMaster: true,
  //   //   CanRead: true,
  //   //   CanWrite: true,
  //   //   ChildPages: [
  //   //     {
  //   //       Id: 7,
  //   //       Code: 'LOGS',
  //   //       Active: true,
  //   //       NameFr: 'Journaux',
  //   //       NameEn: 'Logs',
  //   //       PageName: '/errorManagment/logs',
  //   //       Icon: 'analytics',
  //   //       MasterPageId: 4,
  //   //       IsMaster: false,
  //   //       CanRead: true,
  //   //       CanWrite: true,
  //   //     },
  //   //     {
  //   //       Id: 7,
  //   //       Code: 'NOTIFICATION',
  //   //       Active: true,
  //   //       NameFr: 'Avis',
  //   //       NameEn: 'Notifications',
  //   //       PageName: '/errorManagment/notifications',
  //   //       Icon: 'notifications',
  //   //       MasterPageId: 4,
  //   //       IsMaster: false,
  //   //       CanRead: true,
  //   //       CanWrite: true,
  //   //     },
  //   //   ],
  //   // },
  // ];
  lang!: string;
  public appConstant = AppConstants;
  selected: number | undefined;
  selectedNest: number | undefined;

  constructor(public sharedService: SharedService) {
    super();
  }

  getSideMenu(
    index: number,
    page: any,
    isNested: boolean = false,
    nestedindex?: number
  ): void {
    if (!isNested && page.PageName) {
      this.selected = index;
      this.selectedNest = NaN;
      this.navigate(page.PageName!);
    } else if (isNested) {
      this.selected = index;
      this.selectedNest = nestedindex;
      this.navigate(page.PageName!);
    }
  }
}
