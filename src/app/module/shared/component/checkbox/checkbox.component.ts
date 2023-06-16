import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() value?: boolean = false;
  @Input() classes?: string;
  @Input() id?: string;
  @Input() disabled?: boolean;
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() label?: string;
  @Input() showLabel: boolean = false;
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  changed(event: any) {
    this.callBack.emit(event.checked);
  }
}
