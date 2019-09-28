import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material';

import { HeaderComponent } from './';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
