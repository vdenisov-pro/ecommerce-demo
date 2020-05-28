import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { BaseModalConfirmComponent } from '../base-modal-confirm.component';

@Component({
  selector: 'sp-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.sass']
})
export class ModalDeleteComponent extends BaseModalConfirmComponent {
  constructor(protected ref: NbDialogRef<ModalDeleteComponent>) {
    super(ref);
  }

  public submit() {
    this.ref.close(true);
  }

  public cancel() {
    this.ref.close(false);
  }
}
