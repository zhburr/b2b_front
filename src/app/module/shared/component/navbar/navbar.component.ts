import { Component, OnInit, Inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { BaseComponent } from '../../utilities/base.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends BaseComponent implements OnInit {
  sideNav: any;
  selected?: number;
  user: any = {};
  inputWidth: string = '20%';
  activePages: any;
  title: string = '';
  entityName: string = '';
  activeLang: any;

  constructor(public sharedService: SharedService) {
    super();
    if (
      this.sharedService.userData$.value.email &&
      this.sharedService.userData$.value.role !== 'Admin'
    ) {
      this.sharedService.getUserData();
    }
  }

  ngOnInit(): void {
    this.buttons.push({
      text: 'Logout',
      type: 'danger',
      minWidth: '120px',
    });
  }

  sidebarToggle(): void {
    let sidemenu = document.getElementById('side-menu');
    let slideRight = document.getElementById('slide-right');
    let appContainer = document.getElementsByClassName('app-container');
    if (sidemenu?.classList.contains('open-sidemenu')) {
      sidemenu?.classList.remove('open-sidemenu');
      appContainer[0].classList.remove('p-l-350');
      slideRight?.classList.remove('p-l-200');
    } else {
      sidemenu?.classList.add('open-sidemenu');
      appContainer[0].classList.add('p-l-350');
      slideRight?.classList.add('p-l-200');
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.navigate('home');
  }
}
