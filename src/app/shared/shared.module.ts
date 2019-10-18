import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
} from '@angular/material';

import {
  ErrorHandlerService,
  FooterComponent,
  HeaderComponent,
  ImageIconComponent,
  MenuToggleDirective,
  SpinnerComponent,
  ZodiacWheelComponent,
} from './';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ImageIconComponent,
    MenuToggleDirective,
    SpinnerComponent,
    ZodiacWheelComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ImageIconComponent,
    MatSelectModule,
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
