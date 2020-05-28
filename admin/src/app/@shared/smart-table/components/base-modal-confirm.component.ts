import { NbDialogRef } from '@nebular/theme';

export abstract class BaseModalConfirmComponent {
  constructor(protected ref: NbDialogRef<any>) {}

  public cancel() {
    this.ref.close(false);
  }

  public submit() {
    this.ref.close(true);
  }
}
