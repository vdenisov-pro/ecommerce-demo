import { Injectable } from '@angular/core';
import { assign } from 'lodash';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private config = {
    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    destroyByClick: true,
    status: '',
    duration: 3000,
  };

  constructor(private toastService: NbToastrService) {}

  public showToastSuccess(title, msg, config?) {
    const conf = assign(this.config, config);
    this.toastService.success(msg, title, conf);
  }

  public showToastInfo(title, msg, config?) {
    const conf = assign(this.config, config);
    this.toastService.info(msg, title, conf);
  }

  public showToastWarning(title, msg, config?) {
    const conf = assign(this.config, config);
    this.toastService.warning(msg, title, conf);
  }

  public showToastDanger(title, msg, config?) {
    const conf = assign(this.config, config);
    this.toastService.danger(msg, title, conf);
  }
}
