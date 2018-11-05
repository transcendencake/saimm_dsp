import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Lab1Component } from './lab1/lab1.component';
import { Lab2Component } from './lab2/lab2.component';
import { Kr1Component } from './kr1/kr1.component';

const routes: Routes = [
  { path: '', redirectTo: 'lab1', pathMatch: 'full' },
  { path: 'lab1', component: Lab1Component },
  { path: 'lab2', component: Lab2Component },
  { path: 'kr1', component: Kr1Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaimmRoutingModule { }
