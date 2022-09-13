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

  @Input() set data(data: IGistogramData[]) {
    if (data) {
      this.labels = data.map((el) => this.getLabel(el.start, el.end));
      this.datasets[0].data = data.map(el => el.amount);
    }
  }

  private getLabel(min: number, max: number): string {
    return `[${min.toFixed(2)}, ${max.toFixed(2)})`;
  }
}
