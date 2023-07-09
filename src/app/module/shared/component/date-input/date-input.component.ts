import {
  Component,
  EventEmitter,
  Inject,
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
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';

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
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
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
  ],
})
export class DateInputComponent implements OnInit, OnChanges {
  @Input() inputWidth: any;
  @Input() placeholder?: string;
  @Input() disabled: boolean = false;
  @Input() value: any;
  @Input() min: any;
  @Input() max: any;
  @Input() reset?: boolean;
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

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.format !== 1) {
      this.config.value = this.format;
    }
  }

  dateChange(event: any) {
    this.callBack.emit(moment(this.value).format('YYYY-MM-DD'));
  }

  resetPicker() {
    this.value = undefined;
    this.clear.emit(true);
  }
}
