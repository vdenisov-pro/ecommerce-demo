import { Component, Input } from '@angular/core';

import { Product } from 'src/app/@core/models/product.model';
import { Image } from 'src/app/@core/models/image.model';

import { ApiService } from 'src/app/@core/services/api/api.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';
import { ProductService } from 'src/app/@core/services/api/product/product.service';

import { take } from 'rxjs/operators';


@Component({
  selector: 'sp-product-modal-preview',
  templateUrl: './product-modal-preview.component.html',
  styleUrls: ['./product-modal-preview.component.scss']
})
export class ProductModalPreviewComponent {
  @Input() action: string;
  @Input() source: Product;

  constructor (
    private apiService: ApiService,
    private toastService: ToastService,
    private productService: ProductService,
  ) {}

  public deleteImage(imageId: number) {
    this.apiService.delete(`images/${imageId}`)
    .pipe(take(1))
    .subscribe(
      () => {
        this.source.images = this.source.images
          .filter((image: Image) => image.id !== imageId);
        this.productService.productImageChanges$.next();
        this.toastService.showToastSuccess(
          'Удаление прошло успешно',
          'Честно сказать, мне эта изображение тоже не нравилось');
      },
      (error) => {
        this.toastService.showToastDanger('Ой!', 'Не могу удалить это изображение');
      }
    );
  }
}
