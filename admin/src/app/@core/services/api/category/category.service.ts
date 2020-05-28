import { Injectable } from '@angular/core';
import { BaseHttpListService } from '../../base/base-http-list.service';

import { Category } from 'src/app/@core/models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseHttpListService<Category> {

  protected getPath(): string {
    return `categories/`;
  }

  protected createInstance(data: any): Category {
    return new Category(data);
  }

  protected hasPagination(): boolean {
    return true;
  }

  protected getDefaultForceLoad(): boolean {
    return false;
  }
}
