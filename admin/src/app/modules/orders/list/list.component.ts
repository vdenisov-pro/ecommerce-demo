import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Order, OrderState } from 'src/app/@core/models/order.model';

import { OrderService } from 'src/app/@core/services/api/order/order.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';
import { NbDialogService } from '@nebular/theme';

import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';

import { OrdersRenderCreatedAtComponent } from './components/render-created-at/render-created-at.component';
import { OrdersRenderCompanyComponent } from './components/render-company/render-company.component';
import { OrdersRenderManagerComponent } from './components/render-manager/render-manager.component';
import { OrdersRenderAuthorComponent } from './components/render-author/render-author.component';
import { OrdersRenderAddressComponent } from './components/render-address/render-address.component';
import { OrdersRenderDeliveryDateComponent } from './components/render-delivery-date/render-delivery-date.component';
import { OrdersRenderStatusComponent } from './components/render-status/render-status.component';

import { ModalCancelComponent } from './components/modal-cancel/modal-cancel.component';

import { Subscription } from 'rxjs';
import { mergeMap, filter, take } from 'rxjs/operators';

import get from 'lodash-es/get';
import omit from 'lodash-es/omit';
import assign from 'lodash-es/assign';


@Component({
  selector: 'sp-orders-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  public filteringStatus: string;
  public tableTitle = 'Таблица заказов';

  public tableColumns;
  public ordersList: Order[] = [];

  public isOrdersLoaded: boolean = false;

  public ordersListSubscription: Subscription;
  public ordersLoadSubscription: Subscription;

  public routeChangesSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: NbDialogService,
    private orderService: OrderService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.routeChangesSub = this.activatedRoute.params.subscribe(params => {
      const status = get(params, 'status');

      this._setStatus(status);
      this._setTableColumns();

      this._initOrders();
      this._loadOrders();
    });
  }

  ngOnDestroy(): void {
    !!this.ordersListSubscription && this.ordersListSubscription.unsubscribe();
    !!this.ordersLoadSubscription && this.ordersLoadSubscription.unsubscribe();
  }

  public onCreateOrder(event) {
    this.router.navigate([`/orders/${ActionState.Create}`]);
  }

  public onUpdateOrder(event) {
    const orderId = event.data.id;
    this.router.navigate([`/orders/${orderId}/${ActionState.Update}`]);
  }

  public onAboutOrder(event) {
    const orderId = event.data.id;
    this.router.navigate([`/orders/${orderId}/${ActionState.Details}`]);
  }

  public onCancelOrder(event) {
    this.dialog.open(ModalCancelComponent, { context: {} }).onClose.pipe(
      filter(needToCancel => !!needToCancel),
      mergeMap(() => {
        const order: Order = event.data;

        const updates = assign(
          omit(order, ['company', 'manager', 'user', 'address']),
          { status: OrderState.Cancelled },
        );

        return this.orderService.update(updates);
      }),
      take(1),
    ).subscribe(
        () => this.toastService.showToastSuccess('Успешно', 'Заказ был отменен'),
        () => this.toastService.showToastDanger('Ошибка', 'Заказ не отменен'),
    );
  }

  private _initOrders() {
    this.ordersListSubscription = this.orderService.list.subscribe((orders) => {
      this.ordersList = [];

      if (orders && orders.length > 0) {
        this.ordersList = this.ordersList.concat(orders);
      }
    });
  }

  private _loadOrders() {
    this.isOrdersLoaded = false;

    const params = !this.filteringStatus ? { forceLoad: true }
      : { queryParams: { status: this.filteringStatus }, forceLoad: true };

    this.ordersLoadSubscription = this.orderService.load(params).subscribe({
      next: orders => {
        this.ordersList = [];

        if (orders && orders.length > 0) {
          this.ordersList = this.ordersList.concat(orders);
        }
        this.isOrdersLoaded = true;
      },
      error: error => {
        this.toastService.showToastDanger('Ошибка', 'Заказы не загрузились');
      }
    });
  }

  private _setStatus(status: string) {
    switch (status) {
      case OrderState.New:
        this.filteringStatus = OrderState.New;
        break;
      default:
        this.filteringStatus = null;
        break;
    }
  }

  private _setTableColumns() {
    this.tableColumns = {
      id: {
        title: 'Номер',
        type: 'string',
        width: '5px'
      },
      createdAt: {
        title: 'Дата создания',
        type: 'custom',
        editable: false,
        renderComponent: OrdersRenderCreatedAtComponent,
      },
      companyName: {
        title: 'Название компании',
        type: 'custom',
        editable: false,
        renderComponent: OrdersRenderCompanyComponent,
      },
      manager: {
        title: 'Менеджер',
        type: 'custom',
        editable: false,
        renderComponent: OrdersRenderManagerComponent,
      },
      user: {
        title: 'Создал заказ',
        type: 'custom',
        editable: false,
        renderComponent: OrdersRenderAuthorComponent,
      },
      deliveryAddress: {
        title: 'Адрес доставки',
        type: 'custom',
        editable: false,
        renderComponent: OrdersRenderAddressComponent,
      },
      deliveryDate: {
        title: 'Дата доставки',
        type: 'custom',
        editable: false,
        renderComponent: OrdersRenderDeliveryDateComponent,
      },
      status: {
        title: 'Статус заказа',
        width: '40px',
        type: 'custom',
        renderComponent: OrdersRenderStatusComponent,
      }
    };
  }
}
