import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/libs/components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('../libs/shared/shared.module').then(module => module.SharedModule),
  },
  {
    path: 'quem-somos',
    loadChildren: () => import('../libs/components/quem-somos/quem-somos.module').then(module => module.QuemSomosModule),
  },
  {
    path: 'vagas',
    loadChildren: () => import('../libs/components/vagas/vagas.module').then(module => module.VagasModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },

  // {
  //   path: 'lazy',
  //   loadChildren: () => import('../libs/shared/shared.module').then(module => module.SharedModule),
  // },
  // {
  //   path: '**',
  //   redirectTo: '/',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
