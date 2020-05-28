import { Injectable } from '@angular/core';
import { Order } from 'src/app/@core/models/order.model';

import { BaseHttpListService } from '../../base/base-http-list.service';
import { HttpService } from '../../http/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseHttpListService<Order> {
  constructor(public httpService: HttpService) {
    super(httpService);
  }

  public getPositions(orderId: number): Observable<any> {
    return this.httpService.get(`${this.getPath()}${orderId}/items`);
  }

  public addPosition(id: number, data: object): Observable<any> {
    return this.httpService.post(`${this.getPath()}${id}/items`, data);
  }

  public updatePosition(orderId: number, positionId: number, data: object): Observable<any> {
    return this.httpService.put(`${this.getPath()}${orderId}/items/${positionId}`, data);
  }

  public removePosition(orderId: number, positionId: number): Observable<any> {
    return this.httpService.delete(`${this.getPath()}${orderId}/items/${positionId}`);
  }

  protected getPath(): string {
    return `orders/`;
  }

  public createInstance(data: any): Order {
    return new Order(data);
  }

  protected hasPagination(): boolean {
    return true;
  }

  protected getDefaultForceLoad(): boolean {
    return false;
  }
}
