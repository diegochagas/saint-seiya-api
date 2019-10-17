import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CharacterViewComponent,
  CharactersComponent,
  CharactersListComponent,
  CuriositiesComponent,
  DebutListComponent,
  DebutViewComponent,
  DebutsComponent,
  GetStartedComponent,
  HomeComponent,
} from './';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: CharactersComponent,
    children: [
      {
        path: ':details',
        component: CharactersListComponent
      },
      {
        path: ':details/:class',
        component: CharactersListComponent
      },
      {
        path: ':details/:class/:id',
        component: CharacterViewComponent
      },
    ]
  },
  {
    path: 'get-started',
    component: GetStartedComponent
  },
  {
    path: 'debuts',
    component: DebutsComponent,
    children: [
      {
        path: ':list',
        component: DebutListComponent
      },
      {
        path: ':list/:id',
        component: DebutViewComponent
      },
    ]
  },
  {
    path: 'curiosities',
    component: CuriositiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
