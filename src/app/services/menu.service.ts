import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menus = {
    saimm: [
      {
        link: '/about',
        title: 'About'
      },
      {
        link: '/saimm/lab1',
        title: 'Lab1'
      },
      {
        link: '/saimm/lab2',
        title: 'Lab2'
      },
      {
        link: '/saimm/kr1',
        title: 'KR1'
      }
    ]
  }

  constructor() { }

  getMenuItems(menuKey: string) {
    return this.menus[menuKey];
  }
}
