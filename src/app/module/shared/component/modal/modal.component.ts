import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() template_?: TemplateRef<any>;
  @Input() customWidth?: string;
  @Input() customMaxWidth?: string;
  @Input() customHeight?: string;
  @Input() customMaxHeight?: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  close() {
    this.callback.emit();
  }
}
