import { Component, Input } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';

import { environment } from '../../../../../environments/environment';
import { ToastService } from 'src/app/@core/services/toast/toast.service';
import { ProductService } from 'src/app/@core/services/api/product/product.service';

@Component({
  selector: 'sp-product-modal-images',
  templateUrl: './product-modal-images.component.html',
  styleUrls: ['./product-modal-images.component.scss']
})
export class ProductModalImagesComponent {
  @Input() uploader: FileUploader;
  @Input() productId: number;

  constructor(
    private toastService: ToastService,
    private productService: ProductService,
  ) {}

  public updateUrlForUploader() {
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      item.withCredentials = false;
      item.url = `${environment.apiUrl}/products/${this.productId}/images`;
    };
    this.uploader.onSuccessItem = (item: FileItem) => {
      this.productService.productImageChanges$.next();
      this.toastService.showToastSuccess('Всё получилось!', 'Изображение уже на сервере');
    };
    this.uploader.onErrorItem = (item: FileItem) => {
      this.productService.productImageChanges$.next();
      this.toastService.showToastDanger('Упс', 'Я не смог загрузить это изображение. Попробуйте другое');
    };
  }
}
