import { Component, OnInit } from '@angular/core';
import { DistributionService } from './distributions/distribution.service';
import { debounce, sum, max, min, clone } from 'lodash';
import { AppConstants } from 'src/app/app.constants';
import { ArrayUtils } from 'src/app/utils/array.utils';
import { TriangleDistributionModes } from '../saimm.constants';

interface ILabDistribution<ISettings> {
  settings: ISettings;
  distribution: number[];
}

interface ILabDistributions {
  uniform: ILabDistribution<IDistributionSettingsBase>;
  gaussian: ILabDistribution<IGaussingDistributionSettings>;
  exponential: ILabDistribution<IExponentialDistributionSettings>;
  gamma: ILabDistribution<IGammaDistributionSettings>;
  triangle: ILabDistribution<ITriangleDistributionSettings>;
  simpson: ILabDistribution<IDistributionSettingsBase>;
}

@Component({
  selector: 'app-lab2',
  templateUrl: './lab2.component.html'
})
export class Lab2Component implements OnInit {

  distributions: ILabDistributions = {
    uniform: {
      settings: this.distributionService.getDistributionSettingsBase(),
      distribution: []
    },
    gaussian: {
      settings: this.distributionService.getGaussianSettings(),
      distribution: []
    },
    exponential: {
      settings: this.distributionService.getExponentialSettings(),
      distribution: []
    },
    gamma: {
      settings: this.distributionService.getGammaSettings(),
      distribution: []
    },
    triangle: {
      settings: this.distributionService.getTriangleSettings(),
      distribution: []
    },
    simpson: {
      settings: this.distributionService.getDistributionSettingsBase(),
      distribution: []
    }
  };

  triangleModes = [
    {
      value: TriangleDistributionModes.LOW_TO_HIGH,
      label: 'От меньшего к большему'
    },
    {
      value: TriangleDistributionModes.HIGH_TO_LOW,
      label: 'От большего к меньшему'
    }
  ];

  constructor(
    private distributionService: DistributionService,
    private arrayUtils: ArrayUtils
  ) {
    this.updateUniformDistribution = debounce(this.updateUniformDistribution.bind(this), AppConstants.DEFAULT_DEBOUNCE_MS);
    this.updatedGaussinDistribution = debounce(this.updatedGaussinDistribution.bind(this), AppConstants.DEFAULT_DEBOUNCE_MS);
    this.updateExponentialDistribution = debounce(this.updateExponentialDistribution.bind(this), AppConstants.DEFAULT_DEBOUNCE_MS);
    this.updateGammaDistribution = debounce(this.updateGammaDistribution.bind(this), AppConstants.DEFAULT_DEBOUNCE_MS);
    this.updateTriangleDistribution = debounce(this.updateTriangleDistribution.bind(this), AppConstants.DEFAULT_DEBOUNCE_MS);
    this.updateSimpsonDistribution = debounce(this.updateSimpsonDistribution.bind(this), AppConstants.DEFAULT_DEBOUNCE_MS);
  }

  ngOnInit() {
    this.updateUniformDistribution();
    this.updatedGaussinDistribution();
    this.updateExponentialDistribution();
    this.updateGammaDistribution();
    this.updateTriangleDistribution();
    this.updateSimpsonDistribution();
  }

  updateUniformDistribution(): void {
    this.distributions.uniform.distribution = this.distributionService.getUniformDistribution(this.distributions.uniform.settings);
  }

  updatedGaussinDistribution(): void {
    const { amount, m, d, randAmount } = this.distributions.gaussian.settings;

    const randomArrays: number[][] = [];
    for (let i = 0; i < randAmount; ++i) {
      randomArrays.push(this.distributionService.getRandomNumbers(amount));
    }

    const summsForGenaratingGaussian = [];
    for (let i = 0; i < amount; ++i) {
      let rand = 0;
      randomArrays.forEach(arr => rand += arr[i]);
      summsForGenaratingGaussian.push(rand - randAmount / 2);
    }

    const sko = Math.sqrt(d);
    this.distributions.gaussian.distribution = summsForGenaratingGaussian
      .map(summ => m + sko * Math.sqrt(12 / randAmount) * summ);
  }

  updateExponentialDistribution() {
    const { amount, lambda } = this.distributions.exponential.settings;
    const randNumbers = this.distributionService.getRandomNumbers(amount);
    this.distributions.exponential.distribution = randNumbers.map(rand => -(1 / lambda) * Math.log(rand));
  }

  updateGammaDistribution() {
    const { lambda, n, amount } = this.distributions.gamma.settings;
    this.distributions.gamma.distribution = this.arrayUtils.create(amount, () => {
      const randArr = this.distributionService.getRandomNumbers(n);
      return -(1 / lambda) * sum(randArr.map(p => Math.log(p)));
    });
  }

  updateTriangleDistribution() {
    const { start, end, amount, mode } = this.distributions.triangle.settings;
    const random1 = this.distributionService.getRandomNumbers(amount);
    const random2 = this.distributionService.getRandomNumbers(amount);
    const randSelector = mode === TriangleDistributionModes.LOW_TO_HIGH
      ? (r1, r2) => max([r1, r2])
      : (r1, r2) => min([r1, r2]);
    this.distributions.triangle.distribution = random1.map((el, index) => {
      return start + (end - start) * randSelector(random1[index], random2[index]);
    });
  }

  updateSimpsonDistribution() {
    const settings = clone(this.distributions.simpson.settings);
    settings.start /= 2;
    settings.end /= 2;
    const uniform1 = this.distributionService.getUniformDistribution(settings);
    const uniform2 = this.distributionService.getUniformDistribution(settings);
    this.distributions.simpson.distribution = uniform1
      .map((el, index) => uniform1[index] + uniform2[index]);
  }
}
