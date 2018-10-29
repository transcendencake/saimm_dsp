import { Component, OnInit, Input } from '@angular/core';
import { DistributionService } from '../distributions/distribution.service';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent {

  gistogramData: IGistogramData[];
  distributionElements: number[];
  m: number;
  d: number;
  sko: number;

  @Input() set distribution(distribution: number[]) {
    if (distribution) {
      this.distributionElements = distribution;
      this.gistogramData = this.distributionService.getGistogramData(distribution);
      this.m = this.distributionService.getM(distribution);
      this.d = this.distributionService.getD(distribution, this.m);
      this.sko = this.distributionService.getSKO(this.d);
    }
  }

  constructor(private distributionService: DistributionService) { }
}
