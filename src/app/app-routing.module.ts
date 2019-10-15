import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CharacterViewComponent,
  CharactersComponent,
  CharactersListComponent,
  CuriositiesComponent,
  GetStartedComponent,
  HomeComponent,
  MidiaListComponent,
  MidiaViewComponent,
  MidiasComponent,
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
    path: 'midias',
    component: MidiasComponent
  },
  {
    path: 'midia-list',
    component: MidiaListComponent
  },
  {
    path: 'midia/:id',
    component: MidiaViewComponent
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
