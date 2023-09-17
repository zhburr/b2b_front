import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
import * as moment from 'moment';

// @Injectable()
// export class WeekRangeSelectionStrategy<D>
//   implements MatDateRangeSelectionStrategy<D>
// {
//   constructor(private _dateAdapter: DateAdapter<D>) {}

//   selectionFinished(date: D | null): DateRange<D> {
//     return this._createOneWeekRange(date);
//   }

//   createPreview(activeDate: D | null): DateRange<D> {
//     return this._createOneWeekRange(activeDate);
//   }

//   private _createOneWeekRange(date: D | null): DateRange<D> {
//     if (date) {
//       const start = date;
//       const end = this._dateAdapter.addCalendarDays(date, 6);
//       return new DateRange<D>(start, end);
//     }
//     return new DateRange<D>(null, null);
//   }
// }

export class MyFormats {
  value: number = 1;
  constructor() {}
  get display() {
    return this.value == 1
      ? {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      : {
          dateInput: 'MM-DD',
          monthYearLabel: 'MMMM DD',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM DD',
        };
  }
  get parse() {
    return this.value == 1
      ? {
          dateInput: 'YYYY-MM-DD',
        }
      : {
          dateInput: 'MM-DD',
        };
  }
}
@Component({
  selector: 'app-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {
      provide: MAT_DATE_FORMATS,
      useClass: MyFormats,
    },
    // {
    //   provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    //   useClass: WeekRangeSelectionStrategy,
    // },
  ],
})
export class DateRangeInputComponent {
  @Input() inputWidth: any;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() bothDates: boolean = false;
  @Input() startDate: any;
  @Input() endDate: any;
  @Input() min: any;
  @Input() max: any;
  @Input() reset: boolean = true;
  currentDate = moment();
  @Input() format: number = 1;
  @Output() callBack: EventEmitter<any> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatDatepicker)
  picker?: MatDatepicker<any>;
  constructor(
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DATE_FORMATS) private config: MyFormats
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  dateChange(event: any) {
    if (this.bothDates) {
      let data = {
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: this.endDate
          ? moment(this.endDate).format('YYYY-MM-DD')
          : null,
      };
      this.callBack.emit(data);
    } else {
      if (this.endDate) {
        let data = {
          startDate: moment(this.startDate).format('YYYY-MM-DD'),
          endDate: moment(this.endDate).format('YYYY-MM-DD'),
        };
        this.callBack.emit(data);
      }
    }
  }

  resetPicker() {
    this.startDate = null;
    this.endDate = null;
    this.clear.emit(true);
  }
}
