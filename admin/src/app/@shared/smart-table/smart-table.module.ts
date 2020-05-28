import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartTableComponent } from './smart-table.component';
import { ModalComponentsModule } from './components/modal-components.module';
import { NbIconModule, NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [SmartTableComponent],
  exports: [SmartTableComponent, ModalComponentsModule],
  entryComponents: [],
  imports: [CommonModule, Ng2SmartTableModule, NbCardModule, NbIconModule, ModalComponentsModule]
})
export class SmartTableModule { }
