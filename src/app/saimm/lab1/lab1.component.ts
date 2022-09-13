import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';

type ChartType = 'bar';

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

interface IBarChart {
  type: ChartType;
  datasets: [
    {
      label: string;
      data: number[];
    }
  ];
  options: {
    legend: {
      display: boolean;
    }
    title: {
      display: boolean;
      text: string;
    }
  };
  labels: string[];
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
  lemmInput: ILemmInput = {
    a: 3,
    m: 5,
    r0: 1,
    amount: 5,
    bigAmount: 250000
  };
  barChart: IBarChart = {
    datasets: [
      {
        data: [],
        label: 'Чисел в интервале'
      }
    ],
    options: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Гистограмма'
      }
    },
    labels: [],
    type: 'bar'
  };
  randomProperties: IRandomNumberProperties = {} as IRandomNumberProperties;
  lemmRandomDebugInfo: ILemmRandomDebugInfo[] = [];
  kosvenniePriznaki: IKosvenniePriznaki = {
    otnositelnayaChastotaPopadaniya: null,
    pNa4: Math.PI / 4
  };

  constructor() {
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
    this.barChart.datasets[0].data = this.getDataForGistogramm(20, nums);
    this.barChart.labels = [];
    for (let i = 0; i < this.barChart.datasets[0].data.length; ++i) {
      this.barChart.labels.push((i + 1).toString());
    }
    const t4 = performance.now();
    console.log('Time for generating gistogram data: ' + (t4 - t3));
    this.randomProperties = this.getRandomProperties(nums);
    this.kosvenniePriznaki.otnositelnayaChastotaPopadaniya = this.getOtnositelnayaChastotaPopadaniya(nums);
  }

  getOtnositelnayaChastotaPopadaniya(nums: number[]): number {
    let k = 0;
    for (let i = 0; i < nums.length; i += 2) {
      if (Math.pow(nums[i], 2) + Math.pow(nums[i + 1], 2) < 1) {
        ++k;
      }
    }
    return (2 * k) / nums.length;
  }

  getDataForGistogramm(intervalsAmount: number, nums: number[]): number[] {
    const step = 1 / intervalsAmount;
    const res: number[] = [];
    for (let i = 0; i < 1; i += step) {
      res.push(nums.filter(num => num >= i && num < i + step).length);
    }
    return res;
  }

  getRandomProperties(nums: number[]): IRandomNumberProperties {
    const M = this.getM(nums);
    const D = this.getD(nums, M);
    const period_length = this.getPeriodLength(nums);
    return {
      aperiodichnost_length: this.getAperiodichnostLength(nums, period_length),
      D,
      M,
      period_length,
      SKO: this.getSKO(D)
    };
  }

  getM(nums: number[]): number {
    const summ = nums.reduce((prev, curr) => prev + curr, 0);
    return summ / nums.length;
  }

  getD(nums: number[], m: number): number {
    const summ = nums.reduce((prev, curr) => prev + Math.pow((curr - m), 2), 0);
    return summ / nums.length;
  }

  getSKO(d: number): number {
    return Math.sqrt(d);
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
