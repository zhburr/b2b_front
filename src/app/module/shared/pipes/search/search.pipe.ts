import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(
    data: any,
    searchText?: string,
    key?: any,
    table: boolean = false
  ): any {
    if (!data) return [];
    if (!searchText || typeof searchText !== 'string') return data;

    return data?.filter((val: any) => {
      let arr: any[] = [];
      if (table) {
        key.forEach((some: any) => {
          arr.push(
            some?.subField && some?.subField1
              ? val?.[some.field]?.[some.subField]?.[some.subField1]
                  ?.toString()
                  .toLowerCase()
                  .includes(searchText?.toLowerCase())
              : some?.subField
              ? val?.[some.field]?.[some.subField]
                  ?.toString()
                  .toLowerCase()
                  .includes(searchText?.toLowerCase())
              : val[some.field]
                  ?.toString()
                  .toLowerCase()
                  .includes(searchText?.toLowerCase())
          );
        });
        return arr.some((val) => val);
      } else {
        arr.push(
          val[key]?.toString().toLowerCase().includes(searchText?.toLowerCase())
        );
        return arr.some((val) => val);
      }
    });
  }
}
