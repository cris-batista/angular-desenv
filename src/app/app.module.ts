import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from 'src/libs/components/home/home.module';
import { SharedModule } from 'src/libs/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuemSomosModule } from 'src/libs/components/quem-somos/quem-somos.module';
import { VagasModule } from 'src/libs/components/vagas/vagas.module';
import { DashboardsModule } from 'src/libs/components/dashboards/dashboards.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    QuemSomosModule,
    VagasModule,
    BrowserAnimationsModule,
    DashboardsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
