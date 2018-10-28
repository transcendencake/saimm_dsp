import { Component, OnInit } from '@angular/core';
import { DistributionBase } from '../distribution.base';
import { DistributionService } from '../distribution.service';

@Component({
  selector: 'app-uniform-distribution',
  templateUrl: './uniform-distribution.component.html',
  styleUrls: ['./uniform-distribution.component.scss']
})
export class UniformDistributionComponent extends DistributionBase<IDistributionSettingsBase> implements OnInit {

  constructor(private distributionService: DistributionService) {
    super();
    this.settings = distributionService.getDefaultDistributionSettings();
  }

  ngOnInit() {
    this.updateDistribution();
  }

  updateDistribution() {
    const { start, end, amount } = this.settings;
    const randomNumbers = this.distributionService.getRandomNumbers(amount);
    this.distribution = randomNumbers.map(randomNumber => start + (end - start) * randomNumber);
    this.gistogramData = this.distributionService.getGistogramData(this.distribution);
  }
}
