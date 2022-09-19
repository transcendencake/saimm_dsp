import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lab1Component } from './lab1/lab1.component';
import { Lab2Component } from './lab2/lab2.component';
import { SharedModule } from '../shared.module';
import { DspRoutingModule } from './dsp-routing.module';

@NgModule({
  declarations: [Lab1Component, Lab2Component],
  imports: [
    CommonModule,
    DspRoutingModule,
    SharedModule
  ]
})
export class DspModule { }
