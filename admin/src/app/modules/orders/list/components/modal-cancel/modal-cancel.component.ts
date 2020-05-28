import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { BaseModalConfirmComponent } from 'src/app/@shared/smart-table/components/base-modal-confirm.component';


@Component({
  templateUrl: './modal-cancel.component.html',
  styleUrls: ['./modal-cancel.component.scss']
})
export class ModalCancelComponent extends BaseModalConfirmComponent {
  constructor(protected ref: NbDialogRef<ModalCancelComponent>) {
    super(ref);
  }
}
