import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material';

import { HeaderComponent, MenuItemsComponent } from './';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuItemsComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
