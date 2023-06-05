import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { LoaderService } from './module/shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentChecked, OnInit {
  isLoading: boolean = false;
  constructor(
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.watchStorage().subscribe((data: boolean) => {
      this.isLoading = data;
    });
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}
