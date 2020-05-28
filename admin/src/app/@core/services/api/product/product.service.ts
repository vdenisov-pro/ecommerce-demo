import { Injectable } from '@angular/core';
import { Product } from '../../../models/product.model';
import { BaseHttpListService } from '../../base/base-http-list.service';
import { HttpService } from '../../http/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseHttpListService<Product> {

  public newProductCreated$ = new Subject();

  public productImageChanges$ = new Subject();

  constructor(public httpService: HttpService) {
    super(httpService);
  }

  public searchByName(name: string): Observable<any> {
    return this.httpService.get(`${this.getPath()}filter?name=${name}`);
  }

  protected getPath(): string {
    return `products/`;
  }

  protected createInstance(data: any): Product {
    return new Product(data);
  }

  protected hasPagination(): boolean {
    return true;
  }

  public getProductsByCategoryId(categoryId: number) {
    return this.getItemList({ categoryId });
  }
}
