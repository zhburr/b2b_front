import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
  @Input() value: any;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() type: any;
  @Input() class_: any;
  @Input() disabled?: boolean;
  @Input() inputWidth: any;
  @Input() maxlength?: number;
  @Input() rows?: number;
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  constructor() {}

  inputOnChange(event: any) {
    this.callBack.emit(this.value);
  }
}
