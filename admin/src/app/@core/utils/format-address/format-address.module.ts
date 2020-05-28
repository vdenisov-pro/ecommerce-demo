import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatAddressPipe } from './format-address.pipe';


@NgModule({
  declarations: [
    FormatAddressPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatAddressPipe,
  ]
})
export class FormatAddressModule { }
