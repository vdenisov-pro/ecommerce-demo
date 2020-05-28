import { HttpService } from '../http/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListService } from './base-list.service';

@Injectable()
export abstract class BaseHttpListService<T> extends BaseListService<T> {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(public httpService: HttpService) {
    super();
  }

  protected hasPagination(): boolean {
    return false;
  }

  protected getItemList(queryParams): Observable<any> {
    return this.httpService.get(this.getPath(), queryParams);
  }

  protected getItem(id): Observable<any> {
    return this.httpService.get(this.getPath() + id + '/');
  }

  protected createItem(object): Observable<any> {
    return this.httpService.post(this.getPath(), object);
  }

  protected updateItem(object): Observable<any> {
    return this.httpService.put(this.getPath() + object.id + `/`, object);
  }

  protected deleteItem(id): Observable<any> {
    return this.httpService.delete(this.getPath() + id + `/`);
  }

  // // TODO: must be private
  // public updateItem(object): Observable<any> {
  //   //TODO:deal with services
  //   const { id, ...data } = object;
  //   return this.httpService.put(this.getPath() + id + `/`, data);

  //   // return this.httpService.put(this.getPath() + object.id + `/`, object);
  // }

  // // TODO: must be private
  // public deleteItem(id): Observable<any> {
  //   return this.httpService.delete(this.getPath() + id + `/`);
  // }
}
