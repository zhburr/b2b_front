import { Router } from '@angular/router';
// import { Button } from '../interfaces/button.model';
// import { TableData } from '../interfaces/tableData.model';
// import { TableHeadField } from '../interfaces/tableHeadFields.model';
// import { SharedService } from '../services/shared.service';
import { SharedModule } from '../shared.module';
import { Button } from '../interface/button.model';
import { TableData } from '../interface/table.model';
import { TableHeadField } from '../interface/table-head-field.model';

export class BaseComponent {
  protected static sharedService: any;
  protected static router: any;
  protected location: any;
  buttons: Button[] = [];

  tableData: TableData | undefined;
  tableHeader: TableHeadField[] = [];
  // nestedTableHeader: TableHeadField[] = [];

  navigate(route: string, param: any = {}) {
    if (BaseComponent.router == null)
      BaseComponent.router = SharedModule.injector.get(Router);
    BaseComponent.router.navigate([route], { state: { data: param } });
  }

  notify(type: string, message: string) {
    //  success, danger
    // if (BaseComponent.sharedService == null)
    //   BaseComponent.sharedService = SharedModule.injector.get(SharedService);
    // BaseComponent.sharedService.notify(type, message);
  }

  back() {
    this.location = SharedModule.injector.get(Location);
    this.location.back();
  }

  getMinifiedObject(obj: any, keys: any[]) {
    let res: any = {};
    keys.forEach((x) => {
      res[x] = obj[x];
    });
    return res;
  }

  debounce(func: any, timeout = 1000) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
}
