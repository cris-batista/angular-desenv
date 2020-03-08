import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { FormularioComponent } from './formulario/formulario.component';
import { EditaComponent } from './edita/edita.component';

const routes: Routes = [
	{ path: 'Principal', component: PrincipalComponent },
	{ path: 'Formulario' , component: FormularioComponent },
	{ path: 'edita/:id', component: EditaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
