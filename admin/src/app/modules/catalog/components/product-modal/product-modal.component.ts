import { Component, OnInit, Input } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';
import { NbDialogRef } from '@nebular/theme';

import { Product } from 'src/app/@core/models/product.model';

import { ProductService } from 'src/app/@core/services/api/product/product.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { take } from 'rxjs/operators';

import assign from 'lodash-es/assign';
import { AuthUserService } from 'src/app/@core/services/api/user/auth-user.service';


@Component({
  selector: 'sp-product-modal-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  @Input() action: string;
  @Input() source: Product;
  @Input() categoryId: number;

  public productId: number;
  public modalTitle: string = '';

  public uploader: FileUploader;

  constructor(
    private authService: AuthUserService,
    private productService: ProductService,
    private toastService: ToastService,
    private dialogRef: NbDialogRef<ProductModalComponent>,
  ) {
    this.authService.getIdToken().subscribe((token) => {
      this.uploader = new FileUploader({
        url: `apiUrl/products/:id/images`,
        authToken: token,
        itemAlias: 'image',
        method: 'POST',
      });
    });

  }

  ngOnInit() {
    this.productId = this.source ? this.source.id : 0;
  }

  // TODO: update increase "productCounter" for category by 1
  public createProduct(event: Product) {
    const data = assign(event, { categoryId: this.categoryId });

    this.productService.create(data)
      .pipe(take(1))
      .subscribe(
        (product: Product) => {
          this.productId = product.id;
          // TODO: delete subject, use simple way
          this.productService.newProductCreated$.next();
          this.toastService.showToastSuccess('Иху!', 'Добавили новый продукт');
        },
        (error) => {
          this.toastService.showToastDanger('Пфф!', 'Этот продукт добавить не получилось');
        }
      );
  }

  public updateProduct(event: Product) {
    const updates: Product = assign(this.source, event);

    this.productService.update(updates)
      .pipe(take(1))
      .subscribe(
        (product: Product) => {
          this.productId = product.id;
          this.toastService.showToastSuccess('Продукт изменён', 'Всё правильно сделали');
        },
        (error) => {
          this.toastService.showToastDanger('Блин, ошибка!', 'Не получилось изменить продукт');
        }
      );
  }

  public cancel(event) {
    this.dialogRef.close();
  }
}
