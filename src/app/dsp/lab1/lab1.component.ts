import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html',
  styleUrls: ['./lab1.component.scss']
})
export class Lab1Component implements OnInit {
  public labels: string[];
  public datasets: any;
  public options: any = {
  };
  public N = 512;

  public readonly phaseCount = 5;

  public constAAndFDatasets = [{
    data: [],
    label: '',
    fill: false
  }];
  public constAAndFiDatasets = [{
    data: [],
    label: '',
    fill: false
  }];
  public constFAndFiDatasets = [{
    data: [],
    label: '',
    fill: false
  }];
  public polyharmonicalDatasets = [{
    data: [],
    label: '',
    fill: false
  }];
  public linearHarmonicalDatasets = [{
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

  public ngOnInit(): void {
    this.calculate();
  }

  public calculate(): void {
    this.labels = Array(this.N - 1).fill(0).map((_, i) => i.toString());
    this.setPolyharmonicalDataset();
    this.setConstAAndFDatasets();
    this.setConstAAndFiDatasets();
    this.setConstFAndFiDatasets();
    this.setLinearHarmonicalDatasets();
  }

  private setPolyharmonicalDataset(): void {
    const a = 9;
    const fi = [Math.PI / 2, 0, Math.PI / 4, Math.PI / 3, Math.PI / 6];
    const tempDatasets = Array.from(Array(this.phaseCount), () => new Array(this.N));
    for (let i = 0; i < this.phaseCount; i++) {
      for (let j = 0; j < this.N; j++) {
        tempDatasets[i][j] = a * Math.sin(2 * Math.PI * (i + 1) * j / this.N + fi[i]);
      }
    }

    for (let i = 0; i < this.N; i++) {
      this.polyharmonicalDatasets[0].data[i] = 0;
      for (let j = 0; j < this.phaseCount; j++) {
        this.polyharmonicalDatasets[0].data[i] += tempDatasets[j][i];
      }
    }
  }

  private setConstAAndFDatasets(): void {
    const a = 7;
    const f = 5;
    const fi = [Math.PI, 0, Math.PI / 3, Math.PI / 6, Math.PI / 2];
    const labels = ['Pi', '0', 'Pi / 3', 'Pi / 6', 'Pi / 2'];

    for (let i = 0; i < this.phaseCount; i++) {
      this.constAAndFDatasets[i] = this.getDefaultDataset();
      this.constAAndFDatasets[i].label = labels[i];
      for (let j = 0; j < this.N; j++) {
        this.constAAndFDatasets[i].data[j] = a * Math.sin(2 * Math.PI * f * j / this.N + fi[i]);
      }
    }
  }

  private setConstAAndFiDatasets(): void {
    const a = 5;
    const fi = 3 * Math.PI / 4;
    const f = [1, 5, 11, 6, 3];
    const labels = ['1', '5', '11', '6', '3'];

    for (let i = 0; i < this.phaseCount; i++) {
      this.constAAndFiDatasets[i] = this.getDefaultDataset();
      this.constAAndFiDatasets[i].label = labels[i];
      for (let j = 0; j < this.N; j++) {
        this.constAAndFiDatasets[i].data[j] = a * Math.sin(2 * Math.PI * f[i] * j / this.N + fi);
      }
    }
  }

  private setConstFAndFiDatasets(): void {
    const f = 3;
    const fi = 3 * Math.PI / 4;
    const a = [1, 2, 11, 4, 2];
    const labels = ['1', '2', '11', '4', '2'];

    for (let i = 0; i < this.phaseCount; i++) {
      this.constFAndFiDatasets[i] = this.getDefaultDataset();
      this.constFAndFiDatasets[i].label = labels[i];
      for (let j = 0; j < this.N; j++) {
        this.constFAndFiDatasets[i].data[j] = a[i] * Math.sin(2 * Math.PI * f * j / this.N + fi);
      }
    }
  }

  private setLinearHarmonicalDatasets(): void {
    let a = 7;
    const fi = [Math.PI / 2, 0, Math.PI / 4, Math.PI / 3, Math.PI / 6];
    let f = [1, 2, 3, 4, 5];
    for (let i = 0; i < this.N; i++) {
      this.linearHarmonicalDatasets[0].data[i] = 0;
      const k = 10 / this.N;
      a *= 1 + (0.1 * k);
      f = f.map(p => p * (1 + (0.16 * k)));
      fi[0] *= 1 - (0.1 * k);
      fi[0] *= 1 - (0.1 * k);
      fi[0] *= 1 - (0.1 * k);
      fi[0] *= 1 - (0.1 * k);
      fi[0] *= 1 - (0.1 * k);
      for (let j = 0; j < this.phaseCount; j++) {
        this.linearHarmonicalDatasets[0].data[i] += a * Math.sin(2 * Math.PI * f[j] * (i % this.N) / this.N + fi[j]);
      }
    }
  }

  private getDefaultDataset(): any {
    return {
      data: [],
      label: '',
      fill: false
    };
  }
}
