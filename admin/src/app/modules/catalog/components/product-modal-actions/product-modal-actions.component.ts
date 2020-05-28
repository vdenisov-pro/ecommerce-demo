
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import pick from 'lodash-es/pick';
import get from 'lodash-es/get';

import {
  BaseModalComponent,
  IBaseModalComponent,
  ActionState,
} from 'src/app/@shared/components/base-modal/base-modal.component.js';
import { NbDialogRef } from '@nebular/theme';
import { transformControl } from 'src/app/@shared/components/form-utils.js';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { fullListOfCountries, ICountry } from 'src/assets/countries/all-countries';
import { Product, PRODUCT_BOX_TITLES } from 'src/app/@core/models/product.model';


const PRODUCT_PROPS = [
  'name', 'boxType', 'portionPrice', 'boxPrice',
  'portionWeight', 'boxWeight', 'portionNumber',
  'description', 'producer', 'producerCountry', 'code',
];

@Component({
  selector: 'sp-product-modal-actions',
  templateUrl: './product-modal-actions.component.html',
  styleUrls: ['./product-modal-actions.component.scss']
})
export class ProductModalActionsComponent extends BaseModalComponent<Product> implements OnInit, OnDestroy, IBaseModalComponent {
  @Output() eventCancel = new EventEmitter();
  @Output() eventCreate = new EventEmitter();
  @Output() eventUpdate = new EventEmitter();

  public modalTitle: string;
  public productForm: FormGroup;
  public successButtonText: string;

  public countryList: ICountry[];
  public countryInputSubscription: Subscription;
  public selectedCountry: ICountry;

  public ProductBoxTitles = PRODUCT_BOX_TITLES;
  public AllCountries = fullListOfCountries;

  constructor(fb: FormBuilder, ref: NbDialogRef<ProductModalActionsComponent>) {
    super(fb, ref);
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      boxType: ['', Validators.required],

      portionPrice: ['', Validators.required],
      boxPrice: ['', Validators.required],

      portionWeight: ['', Validators.required],
      boxWeight: ['', Validators.required],

      portionNumber: ['', Validators.required],
      description: ['', Validators.required],

      producer: ['', Validators.required],
      producerCountry: ['', Validators.compose(
        [Validators.required, this._countryValidator()]
      )],
      code: ['', Validators.required],
    });

    this.actionSelect();

    this._initInputCountry();
  }

  ngOnDestroy(): void {
    !!this.countryInputSubscription && this.countryInputSubscription.unsubscribe();
  }

  public createHandler() {
    this.successButtonText = 'Сохранить';
    this.modalTitle = 'Новое блюдо';
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this.modalTitle = 'Редактировать блюдо';
    this.setProductForm();
  }

  public detailsHandler() {
    this.modalTitle = 'Подробнее о блюде';
    this.setProductForm();
  }

  public setProductForm() {
    this.productForm.setValue(
      pick(this.source, PRODUCT_PROPS)
    );

    const countryObj = this.AllCountries.filter(country => country.name === this.source.producerCountry)[0];
    this.selectCountry(countryObj);

    if (this.action === ActionState.Details) {
      this.productForm.disable();
    }
  }

  public saveProductForm() {
    const productData = this.productForm.value;

    if (this.action === ActionState.Create) {
      this.eventCreate.emit(productData);
      this.productForm.setErrors({'incorrect': true});
    } else {
      this.eventUpdate.emit(productData);
    }
  }

  // TODO: check it
  public cancel1() {
    this.eventCancel.emit();
  }

  get name(): FormControl {
    return transformControl(this.productForm.get('name'));
  }
  get boxType(): FormControl {
    return transformControl(this.productForm.get('boxType'));
  }
  get portionPrice(): FormControl {
    return transformControl(this.productForm.get('portionPrice'));
  }
  get boxPrice(): FormControl {
    return transformControl(this.productForm.get('boxPrice'));
  }
  get portionWeight(): FormControl {
    return transformControl(this.productForm.get('portionWeight'));
  }
  get boxWeight(): FormControl {
    return transformControl(this.productForm.get('boxWeight'));
  }
  get portionNumber(): FormControl {
    return transformControl(this.productForm.get('portionNumber'));
  }
  get description(): FormControl {
    return transformControl(this.productForm.get('description'));
  }
  get producer(): FormControl {
    return transformControl(this.productForm.get('producer'));
  }
  get producerCountry(): FormControl {
    return transformControl(this.productForm.get('producerCountry'));
  }
  get code(): FormControl {
    return transformControl(this.productForm.get('code'));
  }

  public onCountryInputClick() {
    this.countryList = this.AllCountries;
  }

  public selectCountry(country: ICountry) {
    this.selectedCountry = country;
  }

  private _initInputCountry() {
    this.countryInputSubscription = this.producerCountry.valueChanges
      .pipe(debounceTime(500))
      .subscribe(text => {
        this.countryList = this.AllCountries.filter(country => country.name.includes(text));
      });
  }

  private _countryValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedCountry) return null;
      // TODO: return property "label_ru"
      return (c.value === get(this.selectedCountry, 'name')) ? null : { 'match': false };
      // return (c.value === get(this.selectedCountry, 'label_ru')) ? null : { 'match': false };
    };
  }
}
