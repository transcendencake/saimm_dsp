import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaimmRoutingModule } from './saimm-routing.module';
import { SaimmComponent } from './saimm.component';
import { Lab1Component } from './lab1/lab1.component';
import { Lab2Component } from './lab2/lab2.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SaimmRoutingModule,
    ChartsModule
  ],
  declarations: [SaimmComponent, Lab1Component, Lab2Component],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SaimmModule { }
