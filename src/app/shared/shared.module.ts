import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';

import {
  ErrorHandlerService,
  FooterComponent,
  HeaderComponent,
  ImageIconComponent,
  ImagePreloadDirective,
  MenuToggleDirective,
  SpinnerComponent,
  ZodiacWheelComponent,
} from './';

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ImageIconComponent,
    ImagePreloadDirective,
    MenuToggleDirective,
    SpinnerComponent,
    ZodiacWheelComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
  ],
  exports: [
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
    ImageIconComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
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
