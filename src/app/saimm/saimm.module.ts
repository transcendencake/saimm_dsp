import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule ,MatButtonModule, MatExpansionModule, MatInputModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';

import { Lab1Component } from './lab1/lab1.component';
import { BigArrayComponent } from './lab2/big-array/big-array.component';
import { DistributionComponent } from './lab2/distribution/distribution.component';
import { DistributionService } from './lab2/distributions/distribution.service';
import { GistogramComponent } from './lab2/gistogram/gistogram.component';
import { Lab2Component } from './lab2/lab2.component';
import { SaimmRoutingModule } from './saimm-routing.module';
import { SaimmComponent } from './saimm.component';
import { Kr1Component } from './kr1/kr1.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SaimmRoutingModule,
    MatInputModule,
    MatButtonModule,
    ChartsModule,
    MatExpansionModule,
    MatRadioModule
  ],
  declarations: [
    SaimmComponent,
    Lab1Component,
    Lab2Component,
    GistogramComponent,
    BigArrayComponent,
    DistributionComponent,
    Kr1Component
  ],
  providers: [DistributionService]
})
export class SaimmModule { }
