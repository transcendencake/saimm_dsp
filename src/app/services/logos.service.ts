import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogosService {
  private logos = {
    'saimm': 'SAIMM'
  };

  constructor() { }

  getLogos(logoKey: string) {
    return this.logos[logoKey];
  }
}
