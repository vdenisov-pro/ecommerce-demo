import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Category } from 'src/app/@core/models/category.model';
import { Product } from 'src/app/@core/models/product.model';

import { CategoryService } from 'src/app/@core/services/api/category/category.service';
import { ProductService } from 'src/app/@core/services/api/product/product.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { CategoriesModalComponent } from '../../components/categories-modal/categories-modal.component';
import { ModalDeleteComponent } from 'src/app/@shared/smart-table/components/modal-delete/modal-delete.component';

import { ProductModalComponent } from '../../components/product-modal/product-modal.component';
import { ProductRenderImageComponent } from '../../components/product-render-image/product-render-image.component';

import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';
import { NbTabsetComponent, NbDialogService } from '@nebular/theme';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import assign from 'lodash-es/assign';
import omit from 'lodash-es/omit';


@Component({
  selector: 'sp-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public tableSettings;
  public tableColumns;

  public selectedCategory: Category;

  public categoryList: Category[] = [];
  public productList: Product[] = [];

  public isCategoriesLoaded: boolean = false;
  public isProductsLoaded: boolean = false;

  public categoryListSubscription: Subscription;
  public categoryLoadSubscription: Subscription;

  public productListSubscription: Subscription;
  public productLoadSubscription: Subscription;
  public productCreateSubscription: Subscription;
  public productImageSubscription: Subscription;

  @ViewChild(NbTabsetComponent, { static: false }) public tabs: NbTabsetComponent;


  constructor(
    private categoryService: CategoryService,
    private dialog: NbDialogService,
    private productService: ProductService,
    private toastService: ToastService,
    private cd: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this._initCategories();
    this._initProducts();
    this._setTableColumns();

    this.loadCategories();
  }

  public ngOnDestroy() {
    if (!!this.categoryLoadSubscription) {
      this.categoryLoadSubscription.unsubscribe();
    }
    if (!!this.categoryListSubscription) {
      this.categoryListSubscription.unsubscribe();
    }

    if (!!this.productLoadSubscription) {
      this.productLoadSubscription.unsubscribe();
    }
    if (!!this.productListSubscription) {
      this.productListSubscription.unsubscribe();
    }
    if (!!this.productCreateSubscription) {
      this.productCreateSubscription.unsubscribe();
    }
    if (!!this.productImageSubscription) {
      this.productImageSubscription.unsubscribe();
    }
  }

  public trackByCategory(category: Category): number {
    return category.id;
  }

  public loadCategories() {
    this.isCategoriesLoaded = false;

    this.categoryLoadSubscription = this.categoryService.load().subscribe({
      next: categories => {
        this.categoryList = [];
        if (categories && categories.length > 0) {
          this.categoryList = this.categoryList.concat(categories);
        }
        this.isCategoriesLoaded = true;
        this._activateFirstTab();
      },
      error: error => { }
    });
  }

  public getProductsForCategory(categoryId: number) {
    this.isProductsLoaded = false;

    this.productLoadSubscription = this.productService
      .load({ queryParams: { categoryId } })
      .subscribe({
        next: products => {
          this.productList = [];
          if (products && products.length > 0) {
            this.productList = this.productList.concat(products);
          }
          this.isProductsLoaded = true;
        },
        error: error => { }
      });
  }

  public selectTab(name: string) {
    // TODO: add scrolling
    this.cd.detectChanges();
    const selectedTab = this.tabs.tabs.filter((tab) => tab.tabTitle === name)[0];
    this.tabs.selectTab(selectedTab);
  }

  public onTabSelect(event) {
    this.selectedCategory = this.categoryList.filter(
      (category: Category) => category.name === event.tabTitle
    )[0];
    this.getProductsForCategory(this.selectedCategory.id);
  }

  public onCreateCategory(e) {
    const dialogToCreateCategory = this.dialog.open(
      CategoriesModalComponent, { context: { action: ActionState.Create, source: null } }
    );

    dialogToCreateCategory.onClose
      .pipe(filter(object => !!object))
      .subscribe((data: object) => {
        this.categoryService.create(data).subscribe(
          (category: Category) => {
            this.toastService.showToastSuccess('Категория добавлена', 'Категорий становится больше и большеееее!');
            // this.onTabSelect({ tabTitle: category.name });
            this.cd.markForCheck();
            this.selectTab(category.name);
          },
          (error) => {
            this.toastService.showToastDanger('Категория не создана', 'Старался из-за всех сил, но не получилось');
          }
        );
      });
  }

  public onUpdateCategory(e) {
    const dialogToUpdateCategory = this.dialog.open(
      CategoriesModalComponent, { context: { action: ActionState.Update, source: this.selectedCategory } }
    );

    dialogToUpdateCategory.onClose
      .pipe(filter(object => !!object))
      .subscribe((data: object) => {
        let updates: Category;
        // concat updates from modal to selected category
        updates = assign({}, this.selectedCategory, data);
        // delete dynamic property "productCounter" from updates
        updates = omit(updates, ['productCounter']);

        this.categoryService.update(updates).subscribe(
          (category: Category) => {
            this.toastService.showToastSuccess('Категория изменена', 'Правильно - так даже лучше!');
            this.loadCategories();
          },
          (error) => {
            this.toastService.showToastDanger('Упс!', 'Эта категория не поддаётся изменениям');
          }
        );
      });
  }

  public onDeleteCategory() {
    const dialogToDeleteCategory = this.dialog.open(ModalDeleteComponent, { context: {} });

    dialogToDeleteCategory.onClose
      .pipe(filter(needToDelete => !!needToDelete))
      .subscribe(() => {
        this.categoryService.delete(this.selectedCategory.id).subscribe(
          () => {
            this.selectedCategory = this.categoryList.length > 0 ? this.categoryList[0] : undefined;
            this.toastService.showToastSuccess('Пока-пока, категоия', 'Мы тебя больше не увидим');
          },
          (error) => {
            this.toastService.showToastDanger(
              'Тадамс!',
              'Эта категория обладает магическими способностями и сейчас сложно её удалить');
          }
        );
      });
  }

  public onCreateProduct() {
    this.dialog.open(ProductModalComponent, {
      context: {
        action: ActionState.Create,
        source: null,
        categoryId: this.selectedCategory.id
      }
    });
  }

  public onAboutProduct(event) {
    const selectedProduct: Product = event.data;

    this.dialog.open(ProductModalComponent, {
      context: { action: ActionState.Details, source: selectedProduct }
    });
  }

  public onUpdateProduct(event) {
    const selectedProduct: Product = event.data;

    this.dialog.open(ProductModalComponent, {
      context: {
        action: ActionState.Update,
        source: selectedProduct,
        categoryId: this.selectedCategory.id,
      }
    });
  }

  public onDeleteProduct(event) {
    const { data: { id: productId } } = event;
    const dialogToDeleteProduct = this.dialog.open(ModalDeleteComponent, { context: {} });

    dialogToDeleteProduct.onClose
      .pipe(filter(needToDelete => !!needToDelete))
      .subscribe(() => {
        this.productService.delete(productId).subscribe(
          () => {
            this.selectedCategory.productCounter -= 1;
            this.toastService.showToastSuccess(
              'Продукт удалён',
              'Это был хороший продукт, но пришло его время уходить');
          },
          (error) => {
            this.toastService.showToastDanger('Блииииин', 'Этот продукт не хочет удаляться');
          }
        );
      });
  }

  private _initCategories() {
    this.categoryListSubscription = this.categoryService.list.subscribe((categories) => {
      this.categoryList = [];
      if (categories && categories.length > 0) {
        this.categoryList = this.categoryList.concat(categories);
      }
    });
  }

  private _initProducts() {
    this.productListSubscription = this.productService.list.subscribe((products) => {
      this.productList = [];
      if (products && products.length > 0) {
        this.productList = this.productList.concat(products);
      }
    });

    this.productCreateSubscription = this.productService.newProductCreated$
      .subscribe(() => {
        this.selectedCategory.productCounter += 1;
      });

    this.productImageSubscription = this.productService.productImageChanges$
      .subscribe(() => {
        this.getProductsForCategory(this.selectedCategory.id);
      });
  }

  private _setTableColumns() {
    this.tableColumns = {
      image: {
        type: 'custom',
        renderComponent: ProductRenderImageComponent,
        filter: false,
      },
      name: {
        title: 'Название',
        type: 'string'
      },
      boxWeight: {
        title: 'Вес коробки (упаковки) гр',
        type: 'string'
      },
      boxPrice: {
        title: 'Цена за коробку (упаковку), тг',
        type: 'string'
      },
      code: {
        title: 'Код товара',
        type: 'string'
      },
    };
  }

  private _activateFirstTab() {
    if (this.categoryList.length > 0) {
      this.selectedCategory = this.categoryList[0];
      const firstCategoryName = this.selectedCategory.name;
      this.onTabSelect({ tabTitle: firstCategoryName });
    }
  }

}
