import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

import pick from 'lodash-es/pick';

import { TypesPerson, LegalPerson } from 'src/app/@core/models/legal-person.model';

import {
  BaseModalComponent,
  IBaseModalComponent,
  ActionState,
} from 'src/app/@shared/components/base-modal/base-modal.component';

import { transformControl } from 'src/app/@shared/components/form-utils';


const PERSON_PROPS = [
  'name', 'type', 'companyDetails'
];

@Component({
  selector: 'sp-modal-legal-person',
  templateUrl: './modal-legal-person.component.html',
  styleUrls: ['./modal-legal-person.component.scss']
})
export class ModalLegalPersonComponent extends BaseModalComponent<LegalPerson> implements OnInit, IBaseModalComponent {
  public personForm: FormGroup;
  public successButtonText: string;
  public modalTitle: string;

  public legalPersonTypes = TypesPerson;

  constructor(
    fb: FormBuilder,
    ref: NbDialogRef<ModalLegalPersonComponent>,
  ) {
    super(fb, ref);
  }

  ngOnInit() {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      personDetails: ['', Validators.required],
    });

    this.actionSelect();
  }

  public createHandler() {
    this.successButtonText = 'Сохранить';
    this.modalTitle = 'Добавить юридическое лицо';
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this.modalTitle = 'Редактировать юридическое лицо';
    this.personForm.setValue(pick(this.source, PERSON_PROPS));
  }

  public detailsHandler() {
    //  FIXME: Метод не нужен, но наследование от BaseModalComponent требует его
  }

  public savePersonForm() {
    const personData = this.personForm.value;

    this.ref.close(personData);
  }

  public cancel() {
  this.ref.close();
  }

  get name(): FormControl {
    return transformControl(this.personForm.get('name'));
  }
  get type(): FormControl {
    return transformControl( this.personForm.get('type'));
  }
  get personDetails(): FormControl {
    return transformControl(this.personForm.get('personDetails'));
  }

  get isActionDetails() {
    return this.action === ActionState.Details;
  }
}
