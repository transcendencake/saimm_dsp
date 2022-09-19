import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuService } from './services/menu.service';
import { ArrayUtils } from './utils/array.utils';
import { FunctionUtils } from './utils/function.utils';
import { StringUtils } from './utils/string.utils';
import { D3Utils } from './utils/d3.utils';
import { SaimmConstants } from './saimm/saimm.constants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [MenuService, ArrayUtils, FunctionUtils, StringUtils, D3Utils, {
    provide: 'd3Selector',
    useValue: SaimmConstants.DEFAULT_D3_SELECTOR
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
