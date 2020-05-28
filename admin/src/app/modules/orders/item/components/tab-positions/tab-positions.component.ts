import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { OrderItem } from 'src/app/@core/models/order-item.model';

import { OrderService } from 'src/app/@core/services/api/order/order.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { ModalPositionComponent } from '../modal-position/modal-position.component';
import { ModalDeleteComponent } from 'src/app/@shared/smart-table/components/modal-delete/modal-delete.component';
import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';

import { Observable } from 'rxjs';
import { mergeMap, filter, take, tap } from 'rxjs/operators';

import each from 'lodash-es/each';
import assign from 'lodash-es/assign';
import omit from 'lodash-es/omit';


@Component({
  selector: 'sp-order-tab-positions',
  templateUrl: './tab-positions.component.html',
  styleUrls: ['./tab-positions.component.scss']
})
export class OrderTabPositionsComponent implements OnInit {
  @Input() action: string;
  @Input() orderId: number;

  public isSpinnerAvailable: boolean = true;

  public positionList: OrderItem[] = [];
  public selectedProductIds: number[] = [];
  public totalPrice: number = 0;

  constructor(
    private dialog: NbDialogService,
    private orderService: OrderService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.actionSelect();
  }

  get isActionDetails() {
    return this.action === ActionState.Details;
  }

  public actionSelect() {
    switch (this.action) {
      case ActionState.Create:
        this.createHandler();
        break;
      case ActionState.Update:
        this.updateHandler();
        break;
      case ActionState.Details:
        this.detailsHandler();
        break;
    }
  }

  public createHandler() {
    this.isSpinnerAvailable = false;
  }

  public updateHandler() {
    this.getPositionsByOrderId(this.orderId).subscribe();
  }

  public detailsHandler() {
    this.getPositionsByOrderId(this.orderId).subscribe();
  }

  public getPositionsByOrderId(orderId: number): Observable<any> {
    return this.orderService.getPositions(orderId).pipe(
      take(1),
      tap((data) => {
        this.positionList = data.items;
        each(data.items, (item: OrderItem) => this.selectedProductIds.push(item.productId));
        this.totalPrice = data.totalPrice;
      }),
    );
  }

  public createPosition() {
    this.dialog.open(ModalPositionComponent, { context: {
      action: ActionState.Create,
      source: null,
      selectedProductIds: this.selectedProductIds,
    }}).onClose.pipe(
      filter(data => !!data),
      mergeMap(positionData => this.orderService.addPosition(this.orderId, positionData)),
      take(1),
    ).subscribe(
      (position: OrderItem) => {
        this.positionList.push(position);
        this.selectedProductIds.push(position.productId);
        this.totalPrice += position.itemPrice;
        this.toastService.showToastSuccess('Успешно', 'Позиция была создана');
      },
      () => this.toastService.showToastDanger('Ошибка', 'Позиция не создана'),
    );
  }

  public updatePosition(positionObj: OrderItem) {
    const oldPositionPrice = positionObj.itemPrice;

    this.dialog.open(ModalPositionComponent, { context: {
      action: ActionState.Update,
      source: positionObj,
    }}).onClose.pipe(
      filter(data => !!data),
      mergeMap(data => {
        const updates = omit(assign(positionObj, data), ['product']);
        return this.orderService.updatePosition(this.orderId, positionObj.id, updates);
      }),
      take(1),
    ).subscribe(
      (updatedPosition: OrderItem) => {
        this.totalPrice += (updatedPosition.itemPrice - oldPositionPrice);
        this.toastService.showToastSuccess('Успешно', 'Позиция была обновлена');
      },
      () => this.toastService.showToastDanger('Ошибка', 'Позиция не обновилась'),
    );
  }

  public deletePosition(positionObj: OrderItem) {
    this.dialog.open(ModalDeleteComponent, { context: {} }).onClose.pipe(
      filter(data => !!data),
      mergeMap(() => this.orderService.removePosition(this.orderId, positionObj.id)),
      take(1),
    ).subscribe(
      () => {
        this.positionList = this.positionList.filter((item: OrderItem) => item.id !== positionObj.id);
        this.selectedProductIds = this.selectedProductIds.filter((id: number) => id !== positionObj.productId);
        this.totalPrice -= positionObj.itemPrice;
        this.toastService.showToastSuccess('Успешно', 'Позиция удалена');
      },
      () => this.toastService.showToastDanger('Ошибка', 'Позиция не удалена'),
    );
  }
}
