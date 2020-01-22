import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { EditaComponent } from './edita/edita.component';

const routes: Routes = [
	{ path: 'Principal', component: PrincipalComponent},
	{ path: 'edita/:id', component: EditaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
