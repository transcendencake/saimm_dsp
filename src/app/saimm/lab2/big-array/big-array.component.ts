import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-big-array',
  templateUrl: './big-array.component.html',
  styleUrls: ['./big-array.component.scss']
})
export class BigArrayComponent implements OnInit {
  @Input() array: number[];
  @Input() step: number;
  

  constructor() { }

  ngOnInit() {
  }

}
