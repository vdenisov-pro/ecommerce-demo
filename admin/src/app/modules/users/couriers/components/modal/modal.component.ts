import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { UserRoles, Courier } from 'src/app/@core/models/user.model';

import { BaseModalComponent, IBaseModalComponent } from 'src/app/@shared/components/base-modal/base-modal.component';

import pick from 'lodash-es/pick';
import { AuthUserService } from 'src/app/@core/services/api/user/auth-user.service';


const СOURIERS_PROPS = [
  'role',
  'name',
  'phone',
  'email',
  'password',
  'description',
];
@Component({
  selector: 'sp-courier-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class CourierModalComponent extends BaseModalComponent<Courier> implements OnInit, IBaseModalComponent {

  public courierForm: FormGroup;
  public successButtonText: string;
  public modalTitle: string;
  public resetPasswordButtonDisabled: boolean = false;

  constructor(
    fb: FormBuilder,
    ref: NbDialogRef<CourierModalComponent>,
    private authService: AuthUserService,
    private toastService: ToastService,
  ) {
    super(fb, ref);
  }

  ngOnInit() {
    this.courierForm = this.fb.group({
      role: [UserRoles.Courier],
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
    this.modalTitle = 'Добавить курьера';
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this.modalTitle = 'Редактировать курьера';
    this.courierForm.setValue(pick(this.source, СOURIERS_PROPS));
  }

  public detailsHandler() {
    this.modalTitle = 'Подробнее о курьере';
    this.courierForm.setValue(pick(this.source, СOURIERS_PROPS));
    this.courierForm.disable();
  }

  public saveCourierForm() {
    const courierData = this.courierForm.value;
    this.ref.close(courierData);
  }

  get name() {
    return this.courierForm.get('name');
  }

  get phone() {
    return this.courierForm.get('phone');
  }

  get email() {
    return this.courierForm.get('email');
  }

  get password() {
    return this.courierForm.get('password');
  }

  get description() {
    return this.courierForm.get('description');
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
