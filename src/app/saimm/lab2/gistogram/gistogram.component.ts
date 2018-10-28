import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gistogram',
  templateUrl: './gistogram.component.html',
  styleUrls: ['./gistogram.component.scss']
})
export class GistogramComponent {
  datasets = [{
    data: [],
    label: 'Чисел в интервале'
  }];

  labels: string[] = [];

  @Input() set data(data: number[]) {
    this.labels = data.map((el, index) => index.toString());
    this.datasets[0].data = data;
  }
}
