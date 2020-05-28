import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserRoles, Courier } from 'src/app/@core/models/user.model';

import { NbDialogService } from '@nebular/theme';
import { UserService } from 'src/app/@core/services/api/user/user.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { CourierModalComponent } from './components/modal/modal.component';
import { ModalDeleteComponent } from 'src/app/@shared/smart-table/components/modal-delete/modal-delete.component';
import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';

import { Subscription } from 'rxjs';
import { mergeMap, take, map, filter } from 'rxjs/operators';

import assign from 'lodash-es/assign';


@Component({
  selector: 'sp-couriers',
  templateUrl: './couriers.component.html',
  styleUrls: ['./couriers.component.scss']
})
export class CouriersComponent implements OnInit, OnDestroy {
  public tableTitle = 'Таблица курьеров';

  public tableColumns;
  public courierList = [];

  public isCouriersLoaded: boolean = false;

  public courierListSubscription: Subscription;
  public courierLoadSubscription: Subscription;

  constructor(
    private dialog: NbDialogService,
    private userService: UserService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this._setTableColumns();

    this._initCouriers();
    this._loadCouriers();
  }

  public ngOnDestroy() {
    !!this.courierListSubscription && this.courierListSubscription.unsubscribe();
    !!this.courierLoadSubscription && this.courierLoadSubscription.unsubscribe();
  }

  public onCreateCourier(event) {
    this.dialog.open(CourierModalComponent, { context: { action: ActionState.Create, source: null }})
      .onClose.pipe(
        filter(data => !!data),
        mergeMap(dataFromModal => this.userService.create(dataFromModal)),
        take(1),
      ).subscribe(
        () => this.toastService.showToastSuccess('Добавили курьера', 'Часть коробля - часть команды'),
        () => this.toastService.showToastDanger('Что-то не так', 'Точно всё правильно ввели?'),
      );
  }

  public onAboutCourier(event) {
    const selectedCourier: Courier = event.data;

    this.dialog.open(CourierModalComponent, {
      context: { action: ActionState.Details, source: selectedCourier }
    });
  }

  public onUpdateCourier(event) {
    const selectedCourier: Courier = event.data;

    this.dialog.open(CourierModalComponent, { context: { action: ActionState.Update, source: selectedCourier }})
      .onClose.pipe(
        filter(data => !!data),
        map(dataFromModal => assign(selectedCourier, dataFromModal)),
        mergeMap(updates => this.userService.update(updates)),
        take(1),
      ).subscribe(
        () => this.toastService.showToastSuccess('Курьер изменен', 'Изменения всегда к лучшему!'),
        () => this.toastService.showToastDanger('Привет, Я - Ошибка!', 'Не получилось изменить курьера'),
      );
  }

  public onDeleteCourier(event) {
    const { data: { id: courierId } } = event;

    this.dialog.open(ModalDeleteComponent, { context: {}})
      .onClose.pipe(
        filter(needToDelete => !!needToDelete),
        mergeMap(() => this.userService.delete(courierId)),
        take(1),
      ).subscribe(
        () => this.toastService.showToastSuccess('А мне он нравился', 'Надеюсь вы уже нашли замену'),
        () => this.toastService.showToastDanger('Опять ошибка!', 'Может быть, дать человеку второй шанс?'),
      );
  }

  private _initCouriers() {
    this.courierListSubscription = this.userService.list.subscribe((users) => {
      this.courierList = [];
      if (users && users.length > 0) {
        this.courierList = this.courierList.concat(users);
      }
    });
  }

  private _loadCouriers() {
    this.isCouriersLoaded = false;

    this.courierLoadSubscription = this.userService
      .load({ queryParams: { role: UserRoles.Courier }, forceLoad: true })
      .subscribe({
        next: users => {
          this.courierList = [];
          if (users && users.length > 0) {
            this.courierList = this.courierList.concat(users);
          }
          this.isCouriersLoaded = true;
        },
        error: error => {
          this.toastService.showToastDanger('Ай-яй', 'Курьеры не загрузились');
        }
      });
  }

  private _setTableColumns() {
    this.tableColumns = {
      name: {
        title: 'Имя',
        type: 'string'
      },
      phone: {
        title: 'Телефон',
        type: 'string'
      },
      email: {
        title: 'Почта',
        type: 'string'
      },
    };
  }
}
