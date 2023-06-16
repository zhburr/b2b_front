import { Pipe, PipeTransform } from '@angular/core';
import { AppConstants } from '../../utilities/app-constants';

@Pipe({
  name: 'oderBy',
})
export class OderByPipe implements PipeTransform {
  transform(
    data: any,
    oderBy?: any,
    orderField?: any,
    dependent?: boolean,
    dependentField?: any
  ): any {
    if (!data) return [];
    if (!oderBy || !orderField) return data;
    if (!dependent) {
      if (oderBy === AppConstants.ASC) {
        return this.ascSort(data, orderField);
      } else {
        return this.dscSort(data, orderField);
      }
    } else {
      let active: any[] = data.filter((x: any) => x[dependentField]);
      let inactive: any[] = data.filter((x: any) => !x[dependentField]);

      if (oderBy === AppConstants.ASC) {
        active = this.ascSort(active, orderField);
        inactive = this.ascSort(inactive, orderField);
        return [...active, ...inactive];
      } else {
        active = this.dscSort(active, orderField);
        inactive = this.dscSort(inactive, orderField);
        return [...active, ...inactive];
      }
    }
  }

  ascSort(data: any, orderField: any) {
    let sortedArray = data.sort((a: any, b: any) => {
      if (
        (orderField?.subField && orderField?.subField1
          ? typeof a?.[orderField.field]?.[orderField.subField]?.[
              orderField.subField1
            ] === 'string'
            ? a?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]?.toLowerCase()
            : a?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]
          : orderField?.subField
          ? typeof a?.[orderField.field]?.[orderField.subField] === 'string'
            ? a?.[orderField.field]?.[orderField.subField]?.toLowerCase()
            : a?.[orderField.field]?.[orderField.subField]
          : typeof a?.[orderField.field] === 'string'
          ? a?.[orderField.field]?.toLowerCase()
          : a?.[orderField.field]) <
        (orderField?.subField && orderField?.subField1
          ? typeof b?.[orderField.field]?.[orderField.subField][
              orderField.subField1
            ] === 'string'
            ? b?.[orderField.field]?.[orderField.subField][
                orderField.subField1
              ]?.toLowerCase()
            : b?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]
          : orderField?.subField
          ? typeof b?.[orderField.field]?.[orderField.subField] === 'string'
            ? b?.[orderField.field]?.[orderField.subField]?.toLowerCase()
            : b?.[orderField.field]?.[orderField.subField]
          : typeof b?.[orderField.field] === 'string'
          ? b?.[orderField.field]?.toLowerCase()
          : b?.[orderField.field])
      ) {
        return -1;
      } else if (
        (orderField?.subField && orderField?.subField1
          ? typeof a?.[orderField.field]?.[orderField.subField]?.[
              orderField.subField1
            ] === 'string'
            ? a?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ].toLowerCase()
            : a?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]
          : orderField?.subField
          ? typeof a?.[orderField.field]?.[orderField.subField] === 'string'
            ? a?.[orderField.field]?.[orderField.subField]?.toLowerCase()
            : a?.[orderField.field]?.[orderField.subField]
          : typeof a?.[orderField.field] === 'string'
          ? a?.[orderField.field]?.toLowerCase()
          : a?.[orderField.field]) >
        (orderField?.subField && orderField?.subField1
          ? typeof b?.[orderField.field]?.[orderField.subField]?.[
              orderField.subField1
            ] === 'string'
            ? b?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]?.toLowerCase()
            : b?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]
          : orderField?.subField
          ? typeof b?.[orderField.field]?.[orderField.subField] === 'string'
            ? b?.[orderField.field]?.[orderField.subField]?.toLowerCase()
            : b?.[orderField.field]?.[orderField.subField]
          : typeof b?.[orderField.field] === 'string'
          ? b?.[orderField.field]?.toLowerCase()
          : b?.[orderField.field])
      ) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortedArray;
  }

  dscSort(data: any, orderField: any) {
    let sortedArray = data.sort((a: any, b: any) => {
      if (
        (orderField?.subField && orderField?.subField1
          ? typeof a?.[orderField.field]?.[orderField.subField]?.[
              orderField.subField1
            ] === 'string'
            ? a?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]?.toLowerCase()
            : a?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]
          : orderField?.subField
          ? typeof a?.[orderField.field]?.[orderField.subField] === 'string'
            ? a?.[orderField.field]?.[orderField.subField]?.toLowerCase()
            : a?.[orderField.field]?.[orderField.subField]
          : typeof a?.[orderField.field] === 'string'
          ? a?.[orderField.field]?.toLowerCase()
          : a?.[orderField.field]) >
        (orderField?.subField && orderField?.subField1
          ? typeof b?.[orderField.field]?.[orderField.subField]?.[
              orderField.subField1
            ] === 'string'
            ? b?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]?.toLowerCase()
            : b?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]
          : orderField?.subField
          ? typeof b?.[orderField.field]?.[orderField.subField] === 'string'
            ? b?.[orderField.field]?.[orderField.subField]?.toLowerCase()
            : b?.[orderField.field]?.[orderField.subField]
          : typeof b?.[orderField.field] === 'string'
          ? b?.[orderField.field].toLowerCase()
          : b?.[orderField.field])
      ) {
        return -1;
      } else if (
        (orderField?.subField && orderField?.subField1
          ? typeof a?.[orderField.field]?.[orderField.subField]?.[
              orderField.subField1
            ] === 'string'
            ? a?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]?.toLowerCase()
            : a?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]
          : orderField?.subField
          ? typeof a?.[orderField.field]?.[orderField.subField] === 'string'
            ? a?.[orderField.field]?.[orderField.subField]?.toLowerCase()
            : a?.[orderField.field]?.[orderField.subField]
          : typeof a?.[orderField.field] === 'string'
          ? a?.[orderField.field]?.toLowerCase()
          : a?.[orderField.field]) <
        (orderField?.subField && orderField?.subField1
          ? typeof b?.[orderField.field]?.[orderField.subField]?.[
              orderField.subField1
            ] === 'string'
            ? b?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]?.toLowerCase()
            : b?.[orderField.field]?.[orderField.subField]?.[
                orderField.subField1
              ]
          : orderField?.subField
          ? typeof b?.[orderField.field]?.[orderField.subField] === 'string'
            ? b?.[orderField.field]?.[orderField.subField]?.toLowerCase()
            : b?.[orderField.field]?.[orderField.subField]
          : typeof b?.[orderField.field] === 'string'
          ? b?.[orderField.field]?.toLowerCase()
          : b?.[orderField.field])
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  }
}
