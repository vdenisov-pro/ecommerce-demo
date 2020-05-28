import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

import { OrderItem } from 'src/app/@core/models/order-item.model';
import { Product } from 'src/app/@core/models/product.model';

import { ProductService } from 'src/app/@core/services/api/product/product.service';

import { transformControl } from 'src/app/@shared/components/form-utils';

import {
  BaseModalComponent,
  IBaseModalComponent,
  ActionState,
} from 'src/app/@shared/components/base-modal/base-modal.component';

import { Subscription } from 'rxjs';
import { debounceTime, mergeMap, take } from 'rxjs/operators';

import get from 'lodash-es/get';
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import assign from 'lodash-es/assign';
import filter from 'lodash-es/filter';
import includes from 'lodash-es/includes';


const POSITION_PROPS = [
  'productPrice',
  'productNumber',
  'itemPrice',
];

@Component({
  selector: 'sp-modal-position',
  templateUrl: './modal-position.component.html',
  styleUrls: ['./modal-position.component.scss']
})
export class ModalPositionComponent extends BaseModalComponent<OrderItem>
  implements OnInit, OnDestroy, IBaseModalComponent {
  @Input() selectedProductIds: number[] = [];

  public successButtonText: string;
  public positionForm: FormGroup;

  public productList: Product[];
  public productInputSubscription: Subscription;
  public selectedProduct: Product;

  constructor(
    protected fb: FormBuilder,
    protected ref: NbDialogRef<ModalPositionComponent>,
    private productService: ProductService,
  ) {
    super(fb, ref);
  }

  ngOnInit() {
    this.positionForm = this.fb.group({
      product: ['', Validators.compose([Validators.required, this._productValidator()])],
      productPrice: [{ value: 0, disabled: true }, Validators.required],
      productNumber: [{ value: 0, disabled: false }, Validators.required],
      itemPrice: [{ value: 0, disabled: true }, Validators.required],
    });

    this.actionSelect();

    this._initInputProduct();

  }

  ngOnDestroy() {
    !!this.productInputSubscription && this.productInputSubscription.unsubscribe();
  }

  get isActionDetails() {
    return this.action === ActionState.Details;
  }

  public createHandler() {
    this.successButtonText = 'Сохранить';
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this.setPositionForm();
    this.product.disable();
  }

  public detailsHandler() {
    this.setPositionForm();
    this.positionForm.disable();
  }

  public setPositionForm() {
    this.positionForm.setValue(assign(
      pick(this.source, POSITION_PROPS),
      {
        product: (this.source.product) ? this.source.product.name : '',
      },
    ));

    this.selectProduct(this.source.product);
  }

  public savePositionForm() {
    // method ".getRawValue()" is used becase some controls in form are disabled
    const formData = this.positionForm.getRawValue();

    const positionData = assign(
      omit(formData, ['product']),
      { productId: this.selectedProduct.id },
    );

    this.ref.close(positionData);
  }

  public cancel() {
    this.ref.close();
  }

  get product(): FormControl { return transformControl(this.positionForm.get('product')); }
  get productPrice(): FormControl { return transformControl(this.positionForm.get('productPrice')); }
  get productNumber(): FormControl { return transformControl(this.positionForm.get('productNumber')); }
  get itemPrice(): FormControl { return transformControl(this.positionForm.get('itemPrice')); }

  public changeItemPrice() {
    const currentProductNumber = this.productNumber.value;
    const currentProductPrice = this.productPrice.value;
    this.itemPrice.setValue(currentProductNumber * currentProductPrice);
  }

  public onProductInputClick() {
    this.productService.searchByName(this.product.value)
      .pipe(take(1)).subscribe(data => this.productList = this._filterResults(data.results));
  }

  public selectProduct(productObj: Product) {
    this.selectedProduct = productObj;
    this.productPrice.setValue(productObj.boxPrice);
    this.changeItemPrice();
  }

  private _initInputProduct() {
    this.productInputSubscription = this.product.valueChanges.pipe(
      debounceTime(500),
      mergeMap(name => this.productService.searchByName(name)),
    ).subscribe(data => this.productList = this._filterResults(data.results));
  }

  private _productValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedProduct) return null;
      return (c.value === get(this.selectedProduct, 'name')) ? null : { 'match': false };
    };
  }

  private _filterResults(productList: Product[]) {
    return filter(productList, (product: Product) => !includes(this.selectedProductIds, product.id));
  }
}
