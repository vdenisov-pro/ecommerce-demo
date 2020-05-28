import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { UserRoles, Manager } from 'src/app/@core/models/user.model';

import { BaseModalComponent, IBaseModalComponent } from 'src/app/@shared/components/base-modal/base-modal.component';

import { transformControl } from 'src/app/@shared/components/form-utils';

import pick from 'lodash-es/pick';
import { AuthUserService } from 'src/app/@core/services/api/user/auth-user.service';


const MANAGERS_PROPS = [
  'role',
  'name',
  'phone',
  'email',
  'password',
  'description',
];

@Component({
  selector: 'sp-manager-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ManagerModalComponent extends BaseModalComponent<Manager> implements OnInit, IBaseModalComponent {
  public managerForm: FormGroup;
  public successButtonText: string;
  public modalTitle: string;
  public resetPasswordButtonDisabled: boolean = false;

  constructor(
    fb: FormBuilder,
    ref: NbDialogRef<ManagerModalComponent>,
    private authService: AuthUserService,
    private toastService: ToastService,
  ) {
    super(fb, ref);
  }

  ngOnInit() {
    this.managerForm = this.fb.group({
      role: [UserRoles.Manager],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      description: [''],
    });

    this.actionSelect();
  }

  public createHandler() {
    this.successButtonText = 'Сохранить';
    this.modalTitle = 'Добавить менеджера';
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this.modalTitle = 'Редактировать менеджера';
    this.managerForm.setValue(pick(this.source, MANAGERS_PROPS));
  }

  public detailsHandler() {
    this.modalTitle = 'Подробнее о менеджере';
    this.managerForm.setValue(pick(this.source, MANAGERS_PROPS));
    this.managerForm.disable();
  }

  public saveManagerForm() {
    const managerData = this.managerForm.value;
    this.ref.close(managerData);
  }

  public cancel() {
    this.ref.close();
  }

  get name(): FormControl {
    return transformControl(this.managerForm.get('name'));
  }
  get phone(): FormControl {
    return transformControl(this.managerForm.get('phone'));
  }
  get email(): FormControl {
    return transformControl(this.managerForm.get('email'));
  }
  get password(): FormControl {
    return transformControl(this.managerForm.get('password'));
  }
  get description(): FormControl {
    return transformControl(this.managerForm.get('description'));
  }

  public async sendPasswordResetEmail() {
    this.resetPasswordButtonDisabled = true;
    try {
      await this.authService.sendPasswordResetEmail(this.email.value);
      this.toastService.showToastSuccess('Успешно', 'Отправлено письмо для сброса пароля');
    } catch (err) {
      this.toastService.showToastDanger('Что-то сломалось', 'Уже чиним');
    }
    this.resetPasswordButtonDisabled = false;
  }
}
