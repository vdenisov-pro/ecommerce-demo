import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { OverlayModule } from '@angular/cdk/overlay';

import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteDirective } from './autocomplete.directive';
import { AutocompleteOptionComponent } from './option/option.component';


const autocompleteUtils = [
  AutocompleteComponent,
  AutocompleteDirective,
  AutocompleteOptionComponent,
  FilterPipe,
];

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [...autocompleteUtils],
  exports: [...autocompleteUtils]
})
export class AutocompleteModule { }
