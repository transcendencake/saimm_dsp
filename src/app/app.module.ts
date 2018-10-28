import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuService } from './services/menu.service';
import { ArrayUtils } from './utils/array.utils';
import { FunctionUtils } from './utils/function.utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [MenuService, ArrayUtils, FunctionUtils],
  bootstrap: [AppComponent]
})
export class AppModule { }
