import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CharacterViewComponent,
  CharactersComponent,
  HomeComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
