import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';

import {
  FooterComponent,
  HeaderComponent,
  ImageIconComponent,
  MenuItemsComponent,
  SpinnerComponent,
  ZodiacWheelComponent,
} from './';

import { ErrorHandlerService } from './services';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ImageIconComponent,
    MenuItemsComponent,
    SpinnerComponent,
    ZodiacWheelComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ImageIconComponent,
    MatTableModule,
    SpinnerComponent,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    }
  ]
})
export class SharedModule { }
