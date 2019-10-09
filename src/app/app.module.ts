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
  HomeComponent,
} from './';
import { GetStartedComponent } from './get-started/get-started.component';
import { ClassesComponent } from './classes/classes.component';
import { MidiasComponent } from './midias/midias.component';
import { MidiaViewComponent } from './midias/midia-view/midia-view.component';
import { MidiaListComponent } from './midias/midia-list/midia-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterViewComponent,
    CharactersComponent,
    HomeComponent,
    GetStartedComponent,
    ClassesComponent,
    MidiasComponent,
    MidiaViewComponent,
    MidiaListComponent,
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
