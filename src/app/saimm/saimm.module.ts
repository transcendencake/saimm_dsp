import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaimmRoutingModule } from './saimm-routing.module';
import { SaimmComponent } from './saimm.component';
import { Lab1Component } from './lab1/lab1.component';
import { Lab2Component } from './lab2/lab2.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SaimmRoutingModule
  ],
  declarations: [SaimmComponent, Lab1Component, Lab2Component],
})
export class SaimmModule { }
