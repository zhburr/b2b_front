import { Component } from '@angular/core';
import { BaseComponent } from '../shared/utilities/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent {
  signOut() {
    localStorage.removeItem('user');
    this.navigate('/home');
  }
}
