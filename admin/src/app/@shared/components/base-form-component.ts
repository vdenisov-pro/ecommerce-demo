import { FormControl } from '@angular/forms';

export class BaseFormComponent {

  public getClassForControl(control: FormControl) {
    if (control.dirty) {
      return control.valid ? 'success' : 'danger';
    }
    if (control.valid) {
      return 'success';
    }
  }

  public onBlur(control: FormControl) {
    control.markAsUntouched();
  }

  public onFocus(control: FormControl) {
    control.markAsTouched();
  }

}

