import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CharacterViewComponent,
  CharactersComponent,
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
    path: 'characters/:details',
    component: CharactersComponent
  },
  {
    path: 'characters/:details/:class',
    component: CharactersComponent
  },
  {
    path: 'characters/:details/:class/:id',
    component: CharacterViewComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
