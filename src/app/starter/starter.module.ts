import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterComponent } from '../starter/starter.component';
import { StarterContentComponent } from '../starter/starter-content/starter-content.component';

import { EditaComponent } from '../edita/edita.component';
import { PrincipalComponent } from '../principal/principal.component';
import { FormularioComponent } from '../formulario/formulario.component';

import { AppRoutingModule } from '../app-routing.module';
import { PrincipalService } from '../principal/principal.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
  	StarterComponent,
  	StarterContentComponent,
  	PrincipalComponent,
    FormularioComponent,
  	EditaComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule
  ],
  exports: [
  	StarterComponent,
  	StarterContentComponent,
    PrincipalComponent,
    FormularioComponent,
    EditaComponent
  ],
  providers: [PrincipalService]
})
export class StarterModule { }
