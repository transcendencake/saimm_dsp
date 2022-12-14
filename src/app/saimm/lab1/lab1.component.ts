import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { DistributionService } from '../lab2/distributions/distribution.service';

interface ILemmRandomDebugInfo {
  n: number;
  r_prev: number;
  a_r_prev: number;
  r_curr: number;
  x_curr: number;
}

interface ILemmInput {
  a: number;
  m: number;
  r0: number;
  amount: number;
  bigAmount: number;
}

interface IRandomNumberProperties {
  M: number;
  D: number;
  SKO: number;
  period_length: number;
  aperiodichnost_length: number;
}

interface IKosvenniePriznaki {
  otnositelnayaChastotaPopadaniya: number;
  pNa4: number;
}

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html'
})
export class Lab1Component implements OnInit {
  gistogramData: IGistogramData[];
  lemmInput: ILemmInput = {
    a: 3,
    m: 5,
    r0: 1,
    amount: 5,
    bigAmount: 250000
  };
  randomProperties: IRandomNumberProperties = {} as IRandomNumberProperties;
  lemmRandomDebugInfo: ILemmRandomDebugInfo[] = [];
  kosvenniePriznaki: IKosvenniePriznaki = {
    otnositelnayaChastotaPopadaniya: null,
    pNa4: Math.PI / 4
  };

  constructor(private distributionService: DistributionService) {
    this.onLemmInputChange = debounce(this.onLemmInputChange.bind(this), 500);
  }

  ngOnInit() {
    this.onLemmInputChange();
  }

  add5() {
    this.lemmInput.amount += 5;
    const { a, m, r0, amount } = this.lemmInput;
    this.lemmRandomDebugInfo = this.getLemms(a, m, r0, amount);
  }

  remove5() {
    if (this.lemmInput.amount > 0) {
      this.lemmInput.amount -= 5;
    }
    const { a, m, r0, amount } = this.lemmInput;
    this.lemmRandomDebugInfo = this.getLemms(a, m, r0, amount);
  }

  onLemmInputChange() {
    const { a, m, r0, amount, bigAmount } = this.lemmInput;
    if (!a || !m || !r0) {
      return;
    }
    const t0 = performance.now();
    const lemms = this.getLemms(a, m, r0, bigAmount);
    const t1 = performance.now();
    console.log('Time for generating 50000 numbers: ' + (t1 - t0));
    const nums = lemms.map(lem => lem.x_curr);
    this.lemmRandomDebugInfo = this.getLemms(a, m, r0, amount);
    const t3 = performance.now();
    this.gistogramData = this.distributionService.getGistogramData(nums);
    const t4 = performance.now();
    console.log('Time for generating gistogram data: ' + (t4 - t3));
    this.randomProperties = this.getRandomProperties(nums);
    this.kosvenniePriznaki.otnositelnayaChastotaPopadaniya = this.getOtnositelnayaChastotaPopadaniya(nums);
  }

  getOtnositelnayaChastotaPopadaniya(nums: number[]): number {
    let k = 0;
    for (let i = 0; i < nums.length; i += 2) {
      if (Math.pow(nums[i], 2) + Math.pow(nums[i !== nums.length ? i + 1 : i], 2) < 1) {
        ++k;
      }
    }
    return (2 * k) / nums.length;
  }

  getRandomProperties(nums: number[]): IRandomNumberProperties {
    const M = this.distributionService.getM(nums);
    const D = this.distributionService.getD(nums, M);
    const period_length = this.getPeriodLength(nums);
    return {
      aperiodichnost_length: this.getAperiodichnostLength(nums, period_length),
      D,
      M,
      period_length,
      SKO: this.distributionService.getSKO(D)
    };
  }

  getAperiodichnostLength(nums: number[], periodLength: number): number {
    let i3: number = null;
    for (let i = 0; i < nums.length - periodLength; ++i) {
      if (nums[i] === nums[i + periodLength]) {
        i3 = i;
        break;
      }
    }
    if (i3 === null) {
      throw new Error('Unknown error, i3 should not be null');
    }
    return i3 + periodLength;
  }

  getPeriodLength(nums: number[]): number {
    const v = (1 / 5) * Math.pow(10, 6);
    const xv = nums[v];
    let i1: number = null;
    let i2: number = null;
    for (let i = 0; i < nums.length; ++i) {
      if (nums[i] === xv) {
        if (i1 == null) {
          i1 = i;
        } else {
          i2 = i;
          break;
        }
      }
    }
    if (i2 == null || i1 == null) {
      throw new Error('Unknown error, neither i1 or i2 should not be null');
    }
    return i2 - i1;
  }

  getLemms(a: number, m: number, r0: number, amount: number): ILemmRandomDebugInfo[] {
    const lemms: ILemmRandomDebugInfo[] = [];
    let r_prev = r0;
    for (let i = 0; i < amount; ++i) {
      const lemm: ILemmRandomDebugInfo = {
        x_curr: a * r_prev % m / m,
        a_r_prev: a * r_prev,
        n: i + 1,
        r_curr: a * r_prev % m,
        r_prev
      } as ILemmRandomDebugInfo;
      lemms.push(lemm);
      r_prev = lemm.r_curr;
    }
    return lemms;
  }
}
