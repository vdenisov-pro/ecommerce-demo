import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalCreateComponent } from './modal-create/modal-create.component';
import { ModalUpdateComponent } from './modal-update/modal-update.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [
    ModalCreateComponent,
    ModalUpdateComponent,
    ModalDeleteComponent,
  ],
  entryComponents: [
    ModalCreateComponent,
    ModalUpdateComponent,
    ModalDeleteComponent,
  ],
  exports: [ModalCreateComponent, ModalUpdateComponent, ModalDeleteComponent],
  imports: [CommonModule, ThemeModule]
})
export class ModalComponentsModule { }
