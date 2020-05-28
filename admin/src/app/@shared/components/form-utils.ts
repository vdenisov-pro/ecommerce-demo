import { FormControl } from '@angular/forms';


  export function transformControl(control): FormControl {
    return control as FormControl;
  }
