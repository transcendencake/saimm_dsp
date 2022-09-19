import { NgModule } from '@angular/core';

import { Lab1Component } from './lab1/lab1.component';
import { BigArrayComponent } from './lab2/big-array/big-array.component';
import { DistributionComponent } from './lab2/distribution/distribution.component';
import { DistributionService } from './lab2/distributions/distribution.service';
import { GistogramComponent } from './lab2/gistogram/gistogram.component';
import { Lab2Component } from './lab2/lab2.component';
import { Kr1Component } from './kr1/kr1.component';
import { SmoService } from './kr1/smo.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { SaimmRoutingModule } from './saimm-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SaimmRoutingModule,
    SharedModule
  ],
  declarations: [
    Lab1Component,
    Lab2Component,
    GistogramComponent,
    BigArrayComponent,
    DistributionComponent,
    Kr1Component
  ],
  providers: [DistributionService, SmoService]
})
export class SaimmModule { }
