import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}
