import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { PrivateUser } from 'src/app/@core/models/user.model';
import { AuthUserService } from 'src/app/@core/services/api/user/auth-user.service';


@Component({
  selector: 'sp-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public user: PrivateUser;

  public userName: string;
  public userPhoto: string;
  public userPictureOnly: boolean = false;
  public userMenu = [{ title: 'Профиль' }, { title: 'Выйти' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: AuthUserService,
    private layoutService: LayoutService,
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.userPhoto = this.user.photoURL;
    this.userName = this.user.getTitle();

    this.menuService.onItemClick().subscribe(({ item }) => {
        if (item.title === 'Выйти') {
          this.authService.signOut();
        } else if (item.title === 'Профиль') {
          //
        }
      });
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  public navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
