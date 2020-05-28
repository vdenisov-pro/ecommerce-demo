import { Component } from '@angular/core';
import { MENU_ITEMS } from './modules-menu';

@Component({
  selector: 'sp-modules',
  styleUrls: ['modules.component.scss'],
  templateUrl: 'modules.component.html',
})
export class ModulesComponent {

  menu = MENU_ITEMS;
}
