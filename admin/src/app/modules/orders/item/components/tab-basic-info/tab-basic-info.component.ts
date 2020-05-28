import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseFormComponent } from 'src/app/@shared/components/base-form-component';
import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';

import { Order, OrderPaymentTitles, OrderDocumentsTitles, OrderStateTitles } from 'src/app/@core/models/order.model';
import { Company } from 'src/app/@core/models/company.model';
import { Manager, Client } from 'src/app/@core/models/user.model';
import { LegalPerson } from 'src/app/@core/models/legal-person.model';
import { Address } from 'src/app/@core/models/address.model';

import { CompanyService } from 'src/app/@core/services/api/company/company.service';
import { OrderService } from 'src/app/@core/services/api/order/order.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';
import { NbDateService } from '@nebular/theme';

import { DatePipe } from '@angular/common';
import { transformControl } from 'src/app/@shared/components/form-utils';
import { FormatAddressPipe } from 'src/app/@core/utils/format-address/format-address.pipe';

import { Subscription, Observable } from 'rxjs';
import { debounceTime, mergeMap, take, tap, filter } from 'rxjs/operators';

import get from 'lodash-es/get';
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import assign from 'lodash-es/assign';

import { HOURS } from './hours';
import { parseISO } from 'date-fns';


const ORDER_PROPS = [
  'deliveryDate',
  'deliveryTimeMin',
  'deliveryTimeMax',
  'paymentMethod',
  'needDocuments',
  'comment',
  'status',
];


@Component({
  selector: 'sp-order-tab-basic-info',
  templateUrl: './tab-basic-info.component.html',
  styleUrls: ['./tab-basic-info.component.scss'],
  providers: [FormatAddressPipe]
})
export class OrderTabBasicInfoComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @Input() action: string;
  @Input() orderId: number;

  @Output() eventCreate = new EventEmitter();

  public source: Order;
  public isSpinnerAvailable: boolean = true;

  public successButtonText: string;
  public orderForm: FormGroup;

  public OrderPays = OrderPaymentTitles;
  public OrderDocuments = OrderDocumentsTitles;
  public OrderStates = OrderStateTitles;
  public hourList = HOURS;

  public selectedOrderMode: string;
  public orderStatus: string;

  public companyList: Company[];
  public companyInputSubscription: Subscription;
  public selectedCompany: Company;
  public controlsAssociatedWithCompany = [];

  public legalPersonList: LegalPerson[];
  public legalPersonInputSubscription: Subscription;
  public selectedLegalPerson: LegalPerson;

  public clientList: Client[];
  public clientInputSubscription: Subscription;
  public selectedClient: Client;

  public managerList: Manager[];
  public managerInputSubscription: Subscription;
  public selectedManager: Manager;

  public selectedDeliveryDate: Date;
  public minDeliveryDate: Date = new Date();
  public maxDeliveryDate: Date = new Date();

  public addressList: Address[];
  public selectedAddress: Address;
  public isSelectAddressOpened: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,

    private toastService: ToastService,
    private companyService: CompanyService,
    private orderService: OrderService,

    private datePipe: DatePipe,
    protected dateService: NbDateService<Date>,
  ) {
    super();
    this._initDeliveryDate();
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      company: [{ value: '', disabled: false }, Validators.compose([Validators.required, this._companyValidator()])],
      legalPerson: [{ value: '', disabled: true }, Validators.compose([Validators.required, this._legalPersonValidator()])],
      client: [{ value: '', disabled: true }, Validators.compose([Validators.required, this._clientValidator()])],
      manager: [{ value: '', disabled: true }, Validators.compose([Validators.required, this._managerValidator()])],
      deliveryDate: [{ value: '', disabled: false }, Validators.required],
      address: [{ value: '', disabled: true }, Validators.required],
      deliveryTimeMin: ['', Validators.required],
      deliveryTimeMax: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      needDocuments: ['', Validators.required],
      comment: [''],
      status: ['new'],
      createdAt: [{ value: '', disabled: true }],
    }, { validator: this._rangeValidator });

    this.actionSelect();

    this._initInputCompany();
    this._initInputLegalPerson();
    this._initInputClient();
    this._initInputManager();
  }

  ngOnDestroy() {
    !!this.companyInputSubscription && this.companyInputSubscription.unsubscribe();
    !!this.legalPersonInputSubscription && this.legalPersonInputSubscription.unsubscribe();
    !!this.clientInputSubscription && this.clientInputSubscription.unsubscribe();
    !!this.managerInputSubscription && this.managerInputSubscription.unsubscribe();
  }

  get company(): FormControl { return transformControl(this.orderForm.get('company')); }
  get legalPerson(): FormControl { return transformControl(this.orderForm.get('legalPerson')); }
  get client(): FormControl { return transformControl(this.orderForm.get('client')); }
  get manager(): FormControl { return transformControl(this.orderForm.get('manager')); }
  get deliveryDate(): FormControl { return transformControl(this.orderForm.get('deliveryDate')); }
  get address(): FormControl { return transformControl(this.orderForm.get('address')); }
  get deliveryTimeMin(): FormControl { return transformControl(this.orderForm.get('deliveryTimeMin')); }
  get deliveryTimeMax(): FormControl { return transformControl(this.orderForm.get('deliveryTimeMax')); }
  get paymentMethod(): FormControl { return transformControl(this.orderForm.get('paymentMethod')); }
  get needDocuments(): FormControl { return transformControl(this.orderForm.get('needDocuments')); }
  get status(): FormControl { return transformControl(this.orderForm.get('status')); }
  get createdAt(): FormControl { return transformControl(this.orderForm.get('createdAt')); }

  get isActionCreate() { return this.action === ActionState.Create; }
  get isActionDetails() { return this.action === ActionState.Details; }

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

  public createHandler() {
    this.isSpinnerAvailable = false;
    this.successButtonText = 'Сохранить';
    this.addressList = [];
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this.getOrderById(this.orderId).subscribe(() => this.setOrderForm());
  }

  public detailsHandler() {
    this.getOrderById(this.orderId).subscribe(() => this.setOrderForm());
  }

  public setOrderForm() {
    this.addressList = [this.source.address];
    // https://github.com/akveo/nebular/issues/1063#issuecomment-465715586

    this.orderForm.setValue(assign(
      pick(this.source, ORDER_PROPS),
      {
        company: (this.source.company) ? this.source.company.name : '',
        legalPerson: (this.source.legalPerson) ? this.source.legalPerson.name : '',
        client: (this.source.client) ? this.source.client.name : '',
        manager: (this.source.manager) ? this.source.manager.name : '',
        deliveryDate: parseISO(`${this.source.deliveryDate}`),
        address: this.source.address || '',
        needDocuments: false,
        createdAt: this.datePipe.transform(this.source.createdAt, 'dd.MM.yy (HH:MM)'),
      },
    ));

    // this.selectedOrderMode = Order.setModeByState(this.source.status);
    this.selectedOrderMode = 'info';
    this.orderStatus = this.source.status;

    this.selectCompany(this.source.company);
    this.selectLegalPerson(this.source.legalPerson);
    this.selectClient(this.source.client);
    this.selectManager(this.source.manager);
    this.selectDeliveryDate(this.source.deliveryDate);
    this.selectAddress(this.source.address);

    if (this.action === ActionState.Details) {
      this.orderForm.disable();
    }
  }

  public cancel() {
    this.router.navigate(['/orders/list/all']);
  }

  public saveOrderForm() {
    const formData = this.orderForm.value;
    const orderData = this.omitExtraProps(formData);
    (this.action === ActionState.Create) ? this.createOrder(orderData) : this.udpateOrder(orderData);
  }

  public omitExtraProps(orderData: Order) {
    const formattedOrder = assign(
      omit(orderData, ['company', 'legalPerson', 'client', 'manager', 'address', 'user']),
      {
        companyId: this.selectedCompany.id,
        legalPeopleId: this.selectedLegalPerson.id,
        clientId: this.selectedClient.id,
        managerId: this.selectedManager.id,
        addressId: this.selectedAddress.id,
      },
    );

    return formattedOrder;
  }

  public getClassForRange(control: FormControl) {
    if (this.orderForm.errors) {
      return this.orderForm.errors.range ? 'danger' : 'success';
    }
    if (control.dirty) {
      return control.valid ? 'success' : 'danger';
    }
    if (control.valid) {
      return 'success';
    }
  }

  public getOrderById(id: number): Observable<any> {
    return this.orderService.getById(id).pipe(
      take(1),
      tap((order: Order) => this.source = order),
    );
  }

  public createOrder(data) {
    this.orderService.create(data).pipe(take(1)).subscribe(
      (order: Order) => {
        this.eventCreate.emit(order.id);
        this.toastService.showToastSuccess('Успешно', 'Заказ был создан');
      },
      (error) => {
        this.toastService.showToastDanger('Ошибка', 'Заказ не создался');
      }
    );
  }

  public udpateOrder(formData) {
    const updatedOrder: Order = assign(this.source, formData);
    const updates = this.omitExtraProps(updatedOrder);
    this.orderService.update(updates).pipe(take(1)).subscribe(
      (order: Order) => {
        this.toastService.showToastSuccess('Успешно', 'Заказ был обновлен');
      },
      (error) => {
        this.toastService.showToastDanger('Ошибка', 'Заказ не обновился');
      }
    );
  }


  public changeOrderState(event) {
    // this.selectedOrderMode = Order.setModeByState(event);
  }

  public disableAssociatedCompanyControls() {
    this.controlsAssociatedWithCompany.forEach(control => control.reset() && control.disable());
  }

  public enableAssociatedCompanyControls() {
    this.controlsAssociatedWithCompany.forEach(control => control.enable());
  }

  public onCompanyInputClick() {
    this.companyService.searchByName(this.company.value)
      .pipe(take(1)).subscribe(data => this.companyList = data.results);
  }

  public selectCompany(companyObj: Company) {
    this.selectedCompany = companyObj;
    this.enableAssociatedCompanyControls();
  }

  private _initInputCompany() {
    this.controlsAssociatedWithCompany = [
      this.legalPerson,
      this.client,
      this.manager,
      this.address,
    ];

    this.companyInputSubscription = this.company.valueChanges.pipe(
      debounceTime(500),
      tap(() => this.company.invalid && this.disableAssociatedCompanyControls()),
      mergeMap(name => this.companyService.searchByName(name)),
    ).subscribe(data => this.companyList = data.results);
  }

  private _companyValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedCompany) return null;
      return (c.value === get(this.selectedCompany, 'name')) ? null : { 'match': false };
    };
  }

  public onLegalPersonInputClick() {
    this.companyService.searchLegalPeopleByName(this.selectedCompany.id, this.legalPerson.value)
      .pipe(take(1)).subscribe(data => this.legalPersonList = data.results);
  }

  public selectLegalPerson(legalPersonObj: LegalPerson) {
    this.selectedLegalPerson = legalPersonObj;
  }

  private _initInputLegalPerson() {
    this.legalPersonInputSubscription = this.legalPerson.valueChanges.pipe(
      debounceTime(500),
      filter(name => !!this.selectedCompany && name !== '' && name !== this.selectedLegalPerson.name),
      mergeMap(name => this.companyService.searchLegalPeopleByName(this.selectedCompany.id, name))
    ).subscribe(data => this.legalPersonList = data.results);
  }

  private _legalPersonValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedLegalPerson) return null;
      return (c.value === get(this.selectedLegalPerson, 'name')) ? null : { 'match': false };
    };
  }

  public onClientInputClick() {
    this.companyService.searchClientsByName(this.selectedCompany.id, this.client.value)
      .pipe(take(1)).subscribe(data => this.clientList = data.results);
  }

  public selectClient(clientObj: Client) {
    this.selectedClient = clientObj;
  }

  private _initInputClient() {
    this.clientInputSubscription = this.client.valueChanges.pipe(
      debounceTime(500),
      filter(name => !!this.selectedCompany && name !== '' && name !== this.selectedClient.name),
      mergeMap(name => this.companyService.searchClientsByName(this.selectedCompany.id, name))
    ).subscribe(data => this.clientList = data.results);
  }

  private _clientValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedClient) return null;
      return (c.value === get(this.selectedClient, 'name')) ? null : { 'match': false };
    };
  }

  public onManagerInputClick() {
    this.companyService.searchManagersByName(this.selectedCompany.id, this.manager.value)
      .pipe(take(1)).subscribe(data => this.managerList = data.results);
  }

  public selectManager(managerObj: Manager) {
    this.selectedManager = managerObj;
  }

  private _initInputManager() {
    this.managerInputSubscription = this.manager.valueChanges.pipe(
      debounceTime(500),
      filter(name => !!this.selectedCompany && name !== '' && name !== this.selectedManager.name),
      mergeMap(name => this.companyService.searchManagersByName(this.selectedCompany.id, name))
    ).subscribe(data => this.managerList = data.results);
  }

  private _managerValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedManager) return null;
      return (c.value === get(this.selectedManager, 'name')) ? null : { 'match': false };
    };
  }

  public selectDeliveryDate(date: Date) {
    this.selectedDeliveryDate = date;
  }

  public _initDeliveryDate() {
    const today = this.dateService.today();
    this.minDeliveryDate = this.dateService.addDay(today, 1);
    this.maxDeliveryDate = this.dateService.addMonth(today, 1);
  }

  private _rangeValidator(fg: FormGroup): { range: boolean } | null {
    const start = fg.get('deliveryTimeMin').value;
    const end = fg.get('deliveryTimeMax').value;
    if (!start || !end) return null;
    return start && end && start <= end
      ? null
      : { range: true };
  }

  public onAddressSelectClick() {
    this.isSelectAddressOpened = !this.isSelectAddressOpened;
    if (this.isSelectAddressOpened) {
      this.companyService.searchAddressesByQuery(this.selectedCompany.id)
        .pipe(take(1)).subscribe(data => this.addressList = data.results);
    }
  }

  public selectAddress(addressObj: Address) {
    this.selectedAddress = addressObj;
  }
}
