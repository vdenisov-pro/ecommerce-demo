import { Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseFormComponent } from '../base-form-component';

export const enum ActionState {
  Create = 'create',
  Update = 'update',
  Details = 'details',
  Remove = 'remove',
}

export interface IBaseModalComponent  {
  createHandler;
  updateHandler;
  detailsHandler;
}

export abstract class BaseModalComponent<T> extends BaseFormComponent {
  @Input() public action: string;
  @Input() public source: T;

  public form: FormGroup;
  public successButtonText: string;
  public modalTitle: string;

  constructor(protected fb: FormBuilder, protected ref) {
    super();
    this.actionSelect();
  }

  public actionSelect() {
    switch (this.action) {
      case ActionState.Create:
        this.createHandler();
        break;
      case ActionState.Update:
        this.updateHandler();
        break;
      case ActionState.Details:
        this.detailsHandler();
        break;
    }
  }

  protected createHandler() { }
  protected updateHandler() { }
  protected detailsHandler() { }

  public cancel() {
    this.ref.close();
  }

}
