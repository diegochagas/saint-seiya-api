import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';

import {
  AboutComponent,
  AppComponent,
  CharacterViewComponent,
  CharactersComponent,
  CharactersListComponent,
  ClassDetailsComponent,
  ConstellationDetailsComponent,
  CuriositiesComponent,
  DebutListComponent,
  DebutViewComponent,
  DebutsComponent,
  EvilStarDetailsComponent,
  GetStartedComponent,
  HomeComponent,
  PersonalDetailsComponent,
  TestCallsComponent,
} from './';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    CharacterViewComponent,
    CharactersComponent,
    CharactersListComponent,
    ClassDetailsComponent,
    ConstellationDetailsComponent,
    CuriositiesComponent,
    DebutListComponent,
    DebutViewComponent,
    DebutsComponent,
    EvilStarDetailsComponent,
    GetStartedComponent,
    HomeComponent,
    PersonalDetailsComponent,
    TestCallsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
