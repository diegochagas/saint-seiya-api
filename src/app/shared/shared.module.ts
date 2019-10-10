import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule, MatProgressSpinnerModule } from '@angular/material';

import {
  FooterComponent,
  HeaderComponent,
  SpinnerComponent,
  ZodiacWheelComponent,
} from './';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    ZodiacWheelComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
