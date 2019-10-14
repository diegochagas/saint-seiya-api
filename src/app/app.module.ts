import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import {
  AppComponent,
  CharacterViewComponent,
  CharactersComponent,
  CharactersListComponent,
  ClassDetailsComponent,
  ConstellationDetailsComponent,
  EvilStarDetailsComponent,
  GetStartedComponent,
  HomeComponent,
  MidiaListComponent,
  MidiaViewComponent,
  MidiasComponent,
  PersonalDetailsComponent,
} from './';

@NgModule({
  declarations: [
    AppComponent,
    CharacterViewComponent,
    CharactersComponent,
    CharactersListComponent,
    ClassDetailsComponent,
    ConstellationDetailsComponent,
    EvilStarDetailsComponent,
    GetStartedComponent,
    HomeComponent,
    MidiaListComponent,
    MidiaViewComponent,
    MidiasComponent,
    PersonalDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
