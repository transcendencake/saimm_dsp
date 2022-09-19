import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'saimm' },
  { path: 'saimm', loadChildren: './saimm/saimm.module#SaimmModule' },
  { path: 'dsp', loadChildren: './dsp/dsp.module#DspModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
