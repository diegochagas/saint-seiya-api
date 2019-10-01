import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule, MatProgressSpinnerModule } from '@angular/material';

import {
  HeaderComponent,
  MenuItemsComponent,
  SpinnerComponent,
  ZodiacWheelComponent,
} from './';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuItemsComponent,
    SpinnerComponent,
    ZodiacWheelComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
