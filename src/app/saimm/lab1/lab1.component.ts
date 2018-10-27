import { Component, OnInit } from '@angular/core';

type ChartType = 'bar';

interface ILemmRandomDebugInfo {
  n: number,
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
  },
  labels: string[];
}

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html',
  styleUrls: ['./lab1.component.scss']
})
export class Lab1Component implements OnInit {
  lemmInput: ILemmInput = {
    a: 3,
    m: 5,
    r0: 1,
    amount: 5,
    bigAmount: 50000
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
  lemmBigAmount = 50000;

  constructor() { }

  ngOnInit() {
    this.onLemmInputChange();
  }

  onLemmInputChange() {
    const { a, m, r0, amount } = this.lemmInput;
    if (!a || !m || !r0) {
      return;
    }
    var t0 = performance.now();
    const lemms = this.getLemms(a, m, r0, this.lemmBigAmount);
    var t1 = performance.now();
    console.log('Time for generating 50000 numbers: ' + (t1 - t0));
    const nums = lemms.map(lem => lem.x_curr);
    this.lemmRandomDebugInfo = this.getLemms(a, m, r0, amount);
    var t3 = performance.now();
    this.barChart.datasets[0].data = this.getDataForGistogramm(20, nums)
    this.barChart.labels = [];
    for (let i = 0; i < this.barChart.datasets[0].data.length; ++i) {
      this.barChart.labels.push((i + 1).toString());
    }
    var t4 = performance.now();
    console.log('Time for generating gistogram data: ' + (t4 - t3));
    this.randomProperties = this.getRandomProperties(nums);
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
    return {
      aperiodichnost_length: this.getAperiodichnostLength(nums),
      D,
      M,
      period_length: this.getPeriodLength(nums),
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

  getAperiodichnostLength(nums: number[]): number {
    return null;
  }

  getPeriodLength(nums: number[]): number {
    return null;
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
