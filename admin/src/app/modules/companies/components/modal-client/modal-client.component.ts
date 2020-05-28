import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

import { BaseModalComponent, IBaseModalComponent } from 'src/app/@shared/components/base-modal/base-modal.component';
import { transformControl } from 'src/app/@shared/components/form-utils';

import { Client } from 'src/app/@core/models/user.model';


@Component({
  selector: 'sp-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class CompaniesModalClientComponent extends BaseModalComponent<Client> implements OnInit, IBaseModalComponent {

  public clientForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected ref: NbDialogRef<CompaniesModalClientComponent>
  ) {
    super(fb, ref);
  }

  ngOnInit() {
    this.clientForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.actionSelect();
  }

  public createHandler() {
    this.successButtonText = 'Сохранить';
    this.modalTitle = 'Добавить клиента для компании';
  }

  // useless
  public updateHandler() {}

  // useless
  public detailsHandler() {}

  public saveClientForm() {}

  public cancel() {
    this.clientForm.reset();
    this.ref.close();
  }

  get name(): FormControl {
    return transformControl(this.clientForm.get('name'));
  }
}
