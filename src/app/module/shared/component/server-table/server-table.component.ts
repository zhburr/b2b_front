import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Button } from '../../interface/button.model';
import { TableData } from '../../interface/table.model';
import { MatPaginator } from '@angular/material/paginator';
import { AppConstants } from '../../utilities/app-constants';
import { UtilitiesService } from '../../utilities/utilities.service';

@Component({
  selector: 'app-server-table',
  templateUrl: './server-table.component.html',
  styleUrls: ['./server-table.component.scss'],
})
export class ServerTableComponent {
  @Input() buttons?: Button[];
  @Input() tableData?: TableData;
  @Input() oderBy: any;
  @Input() tableLabel?: string;
  @Input() selectedRowIndex?: number;
  @Input() searchAppearence: 'outline' | 'fill' = 'fill';
  @Output() buttonCallback: EventEmitter<any> = new EventEmitter(); //this will emit top right button's event with its index
  @Output() searchCallback: EventEmitter<any> = new EventEmitter(); //this will emit top let search-bar's event
  @Output() tableCallback: EventEmitter<any> = new EventEmitter(); //this will emit any clickable event from the table with it's action name and row object
  @Output() paginationCallback: EventEmitter<any> = new EventEmitter(); //this will emit pagination information
  @Output() sortCallback: EventEmitter<any> = new EventEmitter(); //this will emit any sort information
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  appConstants = AppConstants;
  searchKey: string = '';
  originalArray: any[] = [];
  queriedData: any[] = [];
  //pagination
  doPaginate: boolean = false;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  //sorting
  selectedIndex?: number;
  order: string = '';
  //searching
  isSearching: boolean = false;
  totalLength?: number;
  searchedLength?: number;
  searchedData: any[] = [];
  //nested table
  nestedSelectedRow?: number;

  constructor(public utilities: UtilitiesService) {}

  buttonClick(index: number) {
    // this.selectedRow = [];
    this.buttonCallback.emit(index);
  }

  tableClick(key: string, object: any, index: any) {
    let response: any = {
      key: key,
      object: object,
      index: index,
    };
    this.tableCallback.emit(response);
  }

  searchClick(event?: any) {
    //   this.searchKey = event ? event.target.value : this.searchKey;
    //   if (this.doPaginate && this.paginator) {
    //     this.paginator.pageIndex = 0;
    //     this.pageSize = this.paginator.pageSize;
    //   }
    //   if (!this.searchKey.length) {
    //     this.isSearching = false;
    //     this.searchedData = [];
    //     this.searchedLength = 0;
    //     this.chunkInitialData(this.originalArray);
    //   } else {
    //     this.isSearching = true;
    //     this.queriedData = [];
    //     this.searchedData = this.searchPipe.transform(
    //       this.originalArray,
    //       this.searchKey,
    //       this.tableData?.tableHeader,
    //       true
    //     );
    //     this.searchedLength = this.searchedData?.length;
    //     this.queriedData = this.searchedData.filter(
    //       (x, i) => i >= 0 && i < this.pageSize
    //     );
    //   }
  }

  ngOnChanges(): void {
    if (this.tableData?.tableBody) {
      this.totalLength = this.tableData?.tableBody?.length;
      this.doPaginate = this.tableData?.tableBody?.length > 10;
      this.originalArray = JSON.parse(
        JSON.stringify(this.tableData?.tableBody)
      );
      if (this.oderBy) {
        this.sortCol(
          this.tableData.tableHeader[this.oderBy?.HeaderIndex],
          this.oderBy?.HeaderIndex,
          this.oderBy?.Sort,
          this.oderBy?.Dependent ?? false,
          this.oderBy?.DependentField ?? ''
        );
        if (this.selectedRowIndex! >= 0) {
          this.tableClick(
            AppConstants.EDIT,
            this.queriedData[this.selectedRowIndex!],
            this.selectedRowIndex
          );
        }
      } else {
        this.sortCol(this.tableData?.tableHeader[0], 0);
        if (this.selectedRowIndex! >= 0) {
          this.tableClick(
            AppConstants.EDIT,
            this.queriedData[this.selectedRowIndex!],
            this.selectedRowIndex
          );
        }
      }
      if (this.searchKey) {
        this.searchClick();
      }
    }
  }

  tablePagination(event: any) {
    // this.queriedData = [];
    // if (!this.isSearching) {
    //   this.queriedData = this.originalArray.filter(
    //     (x, i) =>
    //       i >= event?.pageIndex * event?.pageSize &&
    //       i < (event?.pageIndex + 1) * event?.pageSize
    //   );
    // } else {
    //   this.queriedData = this.searchedData.filter(
    //     (x, i) =>
    //       i >= event?.pageIndex * event?.pageSize &&
    //       i < (event?.pageIndex + 1) * event?.pageSize
    //   );
    // }
  }

  checkboxCallback(field: any, event: any, row: any, index: any) {
    row[field] = event;
    this.tableClick(AppConstants.CHECKBOX, row, index);
  }

  actionCallbackButton(field: any, event: any, row: any, index: any) {
    this.tableClick(field, row, index);
  }

  toggleCallback(field: any, event: any, row: any, index: any) {
    row[field] = event;
    this.tableClick(AppConstants.TOGGLE, row, index);
  }

  inputCallback(field: any, event: any, row: any, index: any) {
    row[field] = event;
    this.tableClick(AppConstants.INPUT, row, index);
  }

  sortCol(
    col: any,
    index: any,
    sort?: any,
    dependent?: boolean,
    dependentField?: any
  ) {
    // this.selectedIndex = index;
    // this.order = sort
    //   ? sort == 'asc'
    //     ? this.appConstants.ASC
    //     : this.appConstants.DEC
    //   : this.order;
    // if (this.isSearching) {
    //   this.searchedData = this.oderByPipe.transform(
    //     this.searchedData,
    //     this.order,
    //     col,
    //     dependent,
    //     dependentField
    //   );
    //   if (this.doPaginate) {
    //     this.queriedData = this.searchedData.filter(
    //       (x, i) =>
    //         i >= this.paginator?.pageIndex! * this.paginator?.pageSize! &&
    //         i < (this.paginator?.pageIndex! + 1) * this.paginator?.pageSize!
    //     );
    //   } else {
    //     this.chunkInitialData(this.searchedData);
    //   }
    // } else {
    //   this.originalArray = this.oderByPipe.transform(
    //     this.originalArray,
    //     this.order,
    //     col,
    //     dependent,
    //     dependentField
    //   );
    //   if (this.totalLength! > 10 && this.paginator) {
    //     this.queriedData = this.originalArray.filter(
    //       (x, i) =>
    //         i >= this.paginator?.pageIndex! * this.paginator?.pageSize! &&
    //         i < (this.paginator?.pageIndex! + 1) * this.paginator?.pageSize!
    //     );
    //   } else {
    //     this.chunkInitialData(this.originalArray);
    //   }
    // }
    // this.order =
    //   this.order == this.appConstants.DEC
    //     ? this.appConstants.ASC
    //     : this.appConstants.DEC;
  }
}
