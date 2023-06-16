import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent {
  @Input() label?: string;
  @Input() classes?: string;
  @Input() for?: string;
  @Input() labelWidth: string = 'auto';
  @Input() spacingBottom: string = '18px';
  @Input() fontWeight: string = '500';
  @Input() isRequired: boolean = false;
  @Input() fontSize: string = '15px';
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  click() {
    this.callBack.emit();
  }
}
