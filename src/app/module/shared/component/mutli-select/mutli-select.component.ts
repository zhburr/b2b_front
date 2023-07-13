import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConstants } from '../../utilities/app-constants';

@Component({
  selector: 'app-mutli-select',
  templateUrl: './mutli-select.component.html',
  styleUrls: ['./mutli-select.component.scss'],
})
export class MutliSelectComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() placeholder?: string;
  @Input() selectedValue: any;
  @Input() primaryValue: any;
  @Input() displayValue: any;
  @Input() id?: string;
  @Input() options: any = [];
  @Input() isMultiple?: boolean;
  @Input() isGrouped?: boolean;
  @Input() inputWidth?: string;
  @Input() cantSelect?: boolean;
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Output() keyUp: EventEmitter<any> = new EventEmitter();
  public appConstants = AppConstants;

  changed() {
    this.selected.emit(this.selectedValue);
  }

  ngOnInit(): void {}
  keyPress(ev: any) {
    this.keyUp.emit(ev);
  }
}
