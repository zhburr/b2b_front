import { Injectable } from '@angular/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepicker,
} from '@angular/material/datepicker';
@Injectable({
  providedIn: 'root',
})
export class DateRangeService implements MatDateRangeSelectionStrategy<Date> {
  constructor(private _dateAdapter: DateAdapter<Date>) {}

  selectionFinished(date: Date | null): DateRange<Date> {
    return this._createOneWeekRange(date);
  }

  createPreview(activeDate: Date | null): DateRange<Date> {
    return this._createOneWeekRange(activeDate);
  }

  private _createOneWeekRange(date: Date | null): DateRange<Date> {
    if (date) {
      const start = date;
      const end = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<Date>(start, end);
    }
    return new DateRange<Date>(null, null);
  }
}
