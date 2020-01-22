import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PrincipalService } from './principal/principal.service';
import { FormsModule } from '@angular/forms';
import { StarterModule } from './starter/starter.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StarterModule
  ],
  exports: [

  ],
  providers: [PrincipalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
