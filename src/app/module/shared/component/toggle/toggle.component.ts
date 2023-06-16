import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Input() checked?: boolean = false;
  @Input() classes?: string;
  @Input() id?: string;
  @Input() disabled?: boolean;
  @Output() callBack: EventEmitter<any> = new EventEmitter();
  @Output() keyUp: EventEmitter<any> = new EventEmitter();

  changed(event: any) {
    this.callBack.emit(event.checked);
  }

  keyPress(ev: any) {
    this.keyUp.emit(ev);
  }
}
