import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AboutComponent,
  CharacterViewComponent,
  CharactersComponent,
  CharactersListComponent,
  CuriositiesComponent,
  DebutsComponent,
  GetStartedComponent,
  HomeComponent,
  SaintsListComponent,
  SeparatedByComponent,
  TestCallsComponent,
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
        path: 'curiosities',
        component: CuriositiesComponent
      },
      {
        path: 'artist/:id',
        component: SeparatedByComponent,
      },
      {
        path: 'debut/:id',
        component: SeparatedByComponent,
      },
      {
        path: ':details/:class',
        component: SaintsListComponent
      },
      {
        path: ':personal',
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
    component: DebutsComponent
  },
  {
    path: 'debuts/:midia',
    component: DebutsComponent
  },
  {
    path: 'test-calls',
    component: TestCallsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
