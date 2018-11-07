import { Component, OnInit } from '@angular/core';

import { SmoService } from './smo.service';

@Component({
  selector: 'app-kr1',
  templateUrl: './kr1.component.html',
  styleUrls: ['./kr1.component.scss']
})
export class Kr1Component implements OnInit {

  constructor(private smoService: SmoService) { }

  ngOnInit() {
    this.smoService.drawer.drawSmoGraph(this.smoService.graph);
  }

}
