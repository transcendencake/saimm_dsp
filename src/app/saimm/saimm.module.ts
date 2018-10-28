import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatExpansionModule } from '@angular/material';

import { Lab1Component } from './lab1/lab1.component';
import { DistributionService } from './lab2/distributions/distribution.service';
import { UniformDistributionComponent } from './lab2/distributions/uniform-distribution/uniform-distribution.component';
import { GistogramComponent } from './lab2/gistogram/gistogram.component';
import { Lab2Component } from './lab2/lab2.component';
import { SaimmRoutingModule } from './saimm-routing.module';
import { SaimmComponent } from './saimm.component';
import { ChartsModule } from 'ng2-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SaimmRoutingModule,
    MatInputModule,
    MatButtonModule,
    ChartsModule,
    MatExpansionModule
  ],
  declarations: [
    SaimmComponent,
    Lab1Component,
    Lab2Component,
    GistogramComponent,
    UniformDistributionComponent
  ],
  providers: [DistributionService]
})
export class SaimmModule { }
