import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() value: any;
  @Input() placeholder?: string;
  @Input() lablel?: string;
  @Input() appearance: 'outline' | 'fill' = 'outline';
  @Input() type: any;
  @Input() class_: any;
  @Input() disabled?: boolean;
  @Input() id?: string;
  @Input() inputWidth: any;
  @Input() maxlength?: number;
  @Input() minValue?: number;
  @Input() matSuffix?: string;
  @Input() blur: boolean = false;
  @Input() readonly: boolean = false;
  @Output() callBack: EventEmitter<any> = new EventEmitter();
  @Output() keyUp: EventEmitter<any> = new EventEmitter();

  inputOnChange(event: any) {
    this.callBack.emit(this.value);
  }

  keyPress(event: any) {
    this.keyUp.emit(event);
  }
}
