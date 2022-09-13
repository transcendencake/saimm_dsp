import { Component } from '@angular/core';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links: any[];
  logo: string;

  constructor(menuService: MenuService) {
    const key = 'saimm';
    this.links = menuService.getMenuItems(key);
  }
}
