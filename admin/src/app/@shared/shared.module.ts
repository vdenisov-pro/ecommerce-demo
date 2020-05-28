import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent, NotFoundComponent } from './layout';
import { SmartTableModule } from './smart-table/smart-table.module';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SmartTableModule,
  ],
  exports: [
    HomeComponent,
    NotFoundComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SmartTableModule,
  ]
})
export class SharedModule { }
