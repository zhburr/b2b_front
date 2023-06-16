import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../interface/button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() button?: Button;
  @Input() id?: string;
  @Input() disabled: boolean = false;
  @Output() callBack: EventEmitter<any> = new EventEmitter();
  @Output() keyUp: EventEmitter<any> = new EventEmitter();

  fire() {
    this.callBack.emit(null);
  }

  keyPress(ev: any) {
    this.keyUp.emit(ev);
  }
}
