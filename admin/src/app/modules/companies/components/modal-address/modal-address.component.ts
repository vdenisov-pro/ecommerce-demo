import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

import { Courier, UserRoles } from 'src/app/@core/models/user.model';
import { Address } from 'src/app/@core/models/address.model';

import { UserService } from 'src/app/@core/services/api/user/user.service';

import {
  BaseModalComponent,
  IBaseModalComponent,
  ActionState,
} from 'src/app/@shared/components/base-modal/base-modal.component';

import { transformControl } from 'src/app/@shared/components/form-utils';

import pick from 'lodash-es/pick';
import get from 'lodash-es/get';
import assign from 'lodash-es/assign';

import { Subscription } from 'rxjs';
import { debounceTime, mergeMap, take } from 'rxjs/operators';

import { fullListOfCountries, ICountry } from 'src/assets/countries/all-countries';


const ADDRESS_PROPS = [
  'country', 'city', 'street', 'house', 'courier', 'comment'
];

@Component({
  selector: 'sp-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent extends BaseModalComponent<Address>
implements OnInit, OnDestroy, IBaseModalComponent {
  public addressForm: FormGroup;
  public successButtonText: string;
  public modalTilte: string;

  public countryList: ICountry[];
  public countryInputSubscription: Subscription;
  public selectedCountry: ICountry;

  public courierInputSubscription: Subscription;
  public courierList: Courier[];
  public selectedCourier: Courier;

  public AllCountries = fullListOfCountries;

  constructor(
    protected fb: FormBuilder,
    protected ref: NbDialogRef<ModalAddressComponent>,
    private userService: UserService,
  ) {
    super(fb, ref);
  }

  ngOnInit() {
    this.addressForm = this.fb.group({
      country: ['', Validators.compose(
        [Validators.required, this._countryValidator()]
      )],
      city: ['', Validators.required],
      street: ['', Validators.required],
      house: ['', Validators.required],
      courier: ['', Validators.compose(
        [Validators.required, this._courierValidator()]
      )],
      comment: ['']
    });

    this.actionSelect();

    this._initInputCountry();
    this._initInputCourier();
  }

  ngOnDestroy() {
    !!this.countryInputSubscription && this.countryInputSubscription.unsubscribe();
    !!this.courierInputSubscription && this.courierInputSubscription.unsubscribe();
  }

  public createHandler() {
    this.successButtonText = 'Сохранить';
    this.modalTitle = 'Добавить адрес';
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this.modalTitle = 'Редактировать адрес';
    this.setAddressForm();
  }

  public detailsHandler() {
    this.modalTitle = 'Подробнее об адресе';
    this.setAddressForm();
  }

  public setAddressForm() {
    this.addressForm.setValue(
      pick(this.source, ADDRESS_PROPS)
    );

    const countryObj = this.AllCountries.filter(country => country.name === this.source.country)[0];
    this.selectCountry(countryObj);

    if (this.action === ActionState.Details) {
      this.addressForm.disable();
    }
  }

  public saveAddressForm() {
    const formData = this.addressForm.value;

    const addressData = assign(formData, {
      courier: this.selectedCourier,
    });

    this.ref.close(addressData);
  }

  public cancel() {
    this.ref.close();
  }

  get country(): FormControl {
    return transformControl(this.addressForm.get('country'));
  }
  get city(): FormControl {
    return transformControl(this.addressForm.get('city'));
  }
  get street(): FormControl {
    return transformControl(this.addressForm.get('street'));
  }
  get house(): FormControl {
    return transformControl(this.addressForm.get('house'));
  }
  get courier(): FormControl {
    return transformControl(this.addressForm.get('courier'));
  }
  get comment(): FormControl {
    return transformControl(this.addressForm.get('comment'));
  }

  get isActionDetails() {
    return this.action === ActionState.Details;
  }

  public onCountryInputClick() {
    this.countryList = this.AllCountries;
  }

  public selectCountry(country: ICountry) {
    this.selectedCountry = country;
  }

  private _initInputCountry() {
    this.countryInputSubscription = this.country.valueChanges
      .pipe(debounceTime(500))
      .subscribe(text => {
        this.countryList = this.AllCountries.filter(country => country.name.includes(text));
      });
  }

  private _countryValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      // TODO: return property "label_ru"
      return (c.value === get(this.selectedCountry, 'name')) ? null : { 'match': false };
      // return (c.value === get(this.selectedCountry, 'label_ru')) ? null : { 'match': false };
    };
  }

  public selectCourier(courierObj: Courier) {
    this.selectedCourier = courierObj;
  }

  public onCourierInputClick() {
    this.userService.searchBy(UserRoles.Courier, this.courier.value)
      .pipe(take(1)).subscribe(data => this.courierList = data.results);
  }

  private _initInputCourier() {
    this.courierInputSubscription = this.courier.valueChanges.pipe(
      debounceTime(500),
      mergeMap(name => this.userService.searchBy(UserRoles.Courier, name))
    ).subscribe(data => this.courierList = data.results);
  }

  private _courierValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedCourier) return null;
      return (c.value === get(this.selectedCourier, 'name')) ? null : { 'match': false };
    };
  }
}
