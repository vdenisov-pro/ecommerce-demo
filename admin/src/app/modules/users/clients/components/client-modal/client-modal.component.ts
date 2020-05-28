import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

import { UserRoles, Client, Manager, ClientStates } from 'src/app/@core/models/user.model';
import { Company } from 'src/app/@core/models/company.model';

import { UserService } from 'src/app/@core/services/api/user/user.service';
import { CompanyService } from 'src/app/@core/services/api/company/company.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { transformControl } from 'src/app/@shared/components/form-utils';

import { BaseModalComponent, IBaseModalComponent } from 'src/app/@shared/components/base-modal/base-modal.component';

import { Subscription } from 'rxjs';
import { debounceTime, mergeMap, take } from 'rxjs/operators';

import pick from 'lodash-es/pick';
import get from 'lodash-es/get';
import omit from 'lodash-es/omit';
import assign from 'lodash-es/assign';
import { AuthUserService } from 'src/app/@core/services/api/user/auth-user.service';


const CLIENTS_PROPS = [
  'role',
  'status',
  // 'company',
  'name',
  'phone',
  'email',
  'password',
  // 'manager',
  'description',
];
@Component({
  selector: 'sp-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent extends BaseModalComponent<Client> implements OnInit, OnDestroy, IBaseModalComponent {
  public clientForm: FormGroup;
  public successButtonText: string;
  public modalTitle: string;
  public resetPasswordButtonDisabled: boolean = false;

  public clientStates = ClientStates;

  public companyInputSubscription: Subscription;
  public companyList: Company[];
  public selectedCompany: Company;

  public managerInputSubscription: Subscription;
  public managerList: Manager[];
  public selectedManager: Manager;

  constructor(
    protected fb: FormBuilder,
    protected ref: NbDialogRef<ClientModalComponent>,
    private authService: AuthUserService,
    private companyService: CompanyService,
    private userService: UserService,
    private toastService: ToastService,
  ) {
    super(fb, ref);
  }

  ngOnInit() {
    this.clientForm = this.fb.group({
      role: [UserRoles.Client],
      status: [
        { value: 'new', disabled: (this.action === 'details') }
      ],
      company: ['', Validators.compose(
        [Validators.required, this._companyValidator()]
      )],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      manager: ['', Validators.compose(
        [Validators.required, this._managerValidator()]
      )],
      description: ['']
    });

    this.actionSelect();

    this._initInputCompany();
    this._initInputManager();
  }

  ngOnDestroy() {
    (!!this.companyInputSubscription) && (this.companyInputSubscription.unsubscribe());
    (!!this.managerInputSubscription) && (this.managerInputSubscription.unsubscribe());
  }

  public createHandler() {
    this.successButtonText = 'Сохранить';
    this.modalTitle = 'Добавить клиента';
    this.manager.disable();
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this.modalTitle = 'Редактировать клиента';
    this._setClientForm();
    this.company.disable();
    this.manager.disable();
  }

  public detailsHandler() {
    this.modalTitle = 'Подробнее о клиенте';
    this._setClientForm();
    this.clientForm.disable();
  }

  public saveClientForm() {
    const formData = this.clientForm.value;

    const clientData = assign(
      omit(formData, ['company', 'manager']),
      { companyId: this.selectedCompany.id },
      { managerId: this.selectedManager.id },
    );

    this.ref.close(clientData);
  }

  public cancel() {
    this.ref.close();
  }

  get status(): FormControl {
    return transformControl(this.clientForm.get('status'));
  }
  get company(): FormControl {
    return transformControl(this.clientForm.get('company'));
  }
  get name(): FormControl {
    return transformControl(this.clientForm.get('name'));
  }
  get email(): FormControl {
    return transformControl(this.clientForm.get('email'));
  }
  get phone(): FormControl {
    return transformControl(this.clientForm.get('phone'));
  }
  get password(): FormControl {
    return transformControl(this.clientForm.get('password'));
  }
  get description(): FormControl {
    return transformControl(this.clientForm.get('description'));
  }
  get manager(): FormControl {
    return transformControl(this.clientForm.get('manager'));
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

  private _setClientForm() {
    this.clientForm.setValue(assign(
      pick(this.source, CLIENTS_PROPS),
      { company: (this.source.company) ? this.source.company.name : '' },
      { manager: (this.source.manager) ? this.source.manager.name : '' },
    ));
    this._selectCompany(this.source.company);
    this._selectManager(this.source.manager);
  }

  public onCompanyInputClick() {
    this.companyService.searchByName(this.company.value)
      .pipe(take(1)).subscribe(data => this.companyList = data.results);
  }

  private _initInputCompany() {
    this.companyInputSubscription = this.company.valueChanges.pipe(
      debounceTime(500),
      mergeMap(name => this.companyService.searchByName(name)),
    ).subscribe(data => this.companyList = data.results);
  }

  private _selectCompany(companyObj: Company) {
    this.selectedCompany = companyObj;
    if (this.action === 'create') {
      this.manager.enable();
    }
  }

  private _companyValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedCompany) return null;
      return (c.value === get(this.selectedCompany, 'name')) ? null : { 'match': false };
    };
  }

  public onManagerInputClick() {
    this.userService.searchByCompany(UserRoles.Manager, this.manager.value, this.selectedCompany.id)
      .pipe(take(1)).subscribe(data => this.managerList = data.results);
  }

  private _initInputManager() {
    this.managerInputSubscription = this.manager.valueChanges.pipe(
      debounceTime(500),
      mergeMap(name => this.userService.searchByCompany(UserRoles.Manager, name, this.selectedCompany.id))
    ).subscribe(data => this.managerList = data.results);
  }

  private _selectManager(managerObj: Manager) {
    this.selectedManager = managerObj;
  }

  private _managerValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedManager) return null;
      return (c.value === get(this.selectedManager, 'name')) ? null : { 'match': false };
    };
  }
}
