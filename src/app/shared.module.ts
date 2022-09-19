import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatExpansionModule, MatInputModule, MatRadioModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SaimmConstants } from './saimm/saimm.constants';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ChartsModule,
    MatExpansionModule,
    MatRadioModule,
    CommonModule
  ],
  exports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ChartsModule,
    MatExpansionModule,
    MatRadioModule,
    CommonModule
  ],
  providers: [{
    provide: 'd3Selector',
    useValue: SaimmConstants.DEFAULT_D3_SELECTOR
  }],
})
export class SharedModule { }
