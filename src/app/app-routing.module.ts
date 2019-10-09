import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CharacterViewComponent,
  CharactersComponent,
  ClassesComponent,
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
    component: CharactersComponent
  },
  {
    path: 'character/:id',
    component: CharacterViewComponent
  },
  {
    path: 'get-started',
    component: GetStartedComponent
  },
  {
    path: 'classes',
    component: ClassesComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
