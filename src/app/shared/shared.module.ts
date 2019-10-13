import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

import {
  FooterComponent,
  HeaderComponent,
  SpinnerComponent,
  ZodiacWheelComponent,
} from './';
import { ErrorHandlerService } from './services';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    ZodiacWheelComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
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
