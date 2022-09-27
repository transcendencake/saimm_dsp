import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menus = {
    saimm: [
      {
        link: '/saimm/lab1',
        title: 'Saimm Lab1'
      },
      {
        link: '/saimm/lab2',
        title: 'Saimm Lab2'
      },
      {
        link: '/dsp/lab1',
        title: 'Dsp Lab1'
      },
      {
        link: '/dsp/lab2',
        title: 'Dsp Lab2'
      },
      {
        link: '/saimm/lab3',
        title: 'saimm Lab 3-4'
      }
    ]
  };

  constructor() { }

  getMenuItems(menuKey: string) {
    return this.menus[menuKey];
  }
}
