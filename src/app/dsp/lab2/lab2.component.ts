import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab2',
  templateUrl: './lab2.component.html',
  styleUrls: ['./lab2.component.scss']
})
export class Lab2Component implements OnInit {
  public labels: string[] = [];
  public options: any = {
  };
  public N = 64;
  public readonly fi = Math.PI / 8;

  public get K(): number {
    return 3 * this.N / 4;
  }

  public get mArrayLenth(): number {
    return this.N * 2 - this.K + 1;
  }

  public sequence1: number[][];
  public skzFirst1: number[];
  public skzSecond1: number[];
  public skzErrorFirst1: number[];
  public skzErrorSecond1: number[];
  public amplitudeError1: number[];

  public datasets1 = [{
    data: [],
    label: '',
    fill: false
  }];

  public sequence2: number[][];
  public skzFirst2: number[];
  public skzSecond2: number[];
  public skzErrorFirst2: number[];
  public skzErrorSecond2: number[];
  public amplitudeError2: number[];

  public datasets2 = [{
    data: [],
    label: '',
    fill: false
  }];

  public multiplyNBy2(): void {
    this.N *= 2;
  }

  public divideNBy2(): void {
    this.N /= 2;
  }

  ngOnInit() {
    this.calculate();
  }

  public calculate(): void {
    this.labels.length = 0;
    this.labels.push(...Array(this.mArrayLenth).fill(0).map((_, i) => (i + this.K).toString()));
    console.log(this.labels);
    this.calculateFirstSequence();
    this.datasets1 = [
      {
        data: this.amplitudeError1,
        label: 'Amplitude error',
        fill: false
      },
      {
        data: this.skzErrorFirst1,
        label: 'SKZ error 1st',
        fill: false
      },
      {
        data: this.skzErrorSecond1,
        label: 'SKZ error 2nd',
        fill: false
      }
    ];

    this.calculateSecondSequence();
    this.datasets2 = [
      {
        data: this.amplitudeError2,
        label: 'Amplitude error',
        fill: false
      },
      {
        data: this.skzErrorFirst2,
        label: 'SKZ error 1st',
        fill: false
      },
      {
        data: this.skzErrorSecond2,
        label: 'SKZ error 2nd',
        fill: false
      }
    ];

  }

  private calculateFirstSequence(): void {
    this.sequence1 = Array.from(Array(this.mArrayLenth), () => new Array(1));
    for (let i = 0; i < this.mArrayLenth; i++) {
      for (let j = 0; j <= i; j++) {
        this.sequence1[i][j] = Math.sin(2 * Math.PI * j / this.N);
      }
    }
    this.skzFirst1 = this.getSkzFirst(this.sequence1);
    this.skzSecond1 = this.getSkzSecond(this.sequence1);
    this.skzErrorFirst1 = this.getSkzError(this.skzFirst1);
    this.skzErrorSecond1 = this.getSkzError(this.skzSecond1);
    this.amplitudeError1 = this.getAmplitudeError(this.getAmplitudes(this.sequence1));
  }

  private calculateSecondSequence(): void {
    this.sequence2 = Array.from(Array(this.mArrayLenth), () => new Array(1));
    for (let i = 0; i < this.mArrayLenth; i++) {
      for (let j = 0; j <= i; j++) {
        this.sequence2[i][j] = Math.sin(2 * Math.PI * j / this.N + this.fi);
      }
    }
    this.skzFirst2 = this.getSkzFirst(this.sequence2);
    this.skzSecond2 = this.getSkzSecond(this.sequence2);
    this.skzErrorFirst2 = this.getSkzError(this.skzFirst2);
    this.skzErrorSecond2 = this.getSkzError(this.skzSecond2);
    this.amplitudeError2 = this.getAmplitudeError(this.getAmplitudes(this.sequence2));
  }

  private getSkzFirst(sequence: number[][]): number[] {
    const result = Array(this.mArrayLenth);
    for (let i = 0; i < this.mArrayLenth; i++) {
      const m = i + this.K;
      const sumOfSquares = sequence[i].reduce((prev, curr) => prev + Math.pow(curr, 2), 0);
      result[i] = Math.sqrt(1 / (m + 1) * sumOfSquares);
    }
    return result;
  }

  private getSkzSecond(sequence: number[][]): number[] {
    const result = Array(this.mArrayLenth);
    for (let i = 0; i < this.mArrayLenth; i++) {
      const m = i + this.K;
      const sumOfSquares = sequence[i].reduce((prev, curr) => prev + Math.pow(curr, 2), 0);
      const sum = sequence[i].reduce((prev, curr) => prev + curr, 0);
      result[i] = Math.sqrt((1 / (m + 1) * sumOfSquares) - Math.pow((1 / (m + 1) * sum), 2));
    }
    return result;
  }

  private getAmplitudes(sequence: number[][]): number[] {
    const result = Array(this.mArrayLenth);
    for (let i = 0; i < this.mArrayLenth; i++) {
      const cosAmplitudeSum = sequence[i].reduce((prev, curr) => prev + curr * Math.cos(2 * Math.PI * i / this.mArrayLenth))
        * 2 / this.mArrayLenth;
      const sinAmplitudeSum = sequence[i].reduce((prev, curr) => prev + curr * Math.sin(2 * Math.PI * i / this.mArrayLenth))
        * 2 / this.mArrayLenth;
      result[i] = Math.sqrt(Math.pow(cosAmplitudeSum, 2) + Math.pow(sinAmplitudeSum, 2));
    }
    return result;
  }

  private getSkzError(skz: number[]): number[] {
    return skz.map(p => 0.707 - p);
  }

  private getAmplitudeError(amplitudes: number[]): number[] {
    return amplitudes.map(p => 1 - p);
  }

  private getDefaultDataset(): any {
    return {
      data: [],
      label: '',
      fill: false
    };
  }
}
