import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserRoles, Manager } from 'src/app/@core/models/user.model';

import { NbDialogService } from '@nebular/theme';
import { UserService } from 'src/app/@core/services/api/user/user.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';
import { ManagerModalComponent } from './components/modal/modal.component';
import { ModalDeleteComponent } from 'src/app/@shared/smart-table/components/modal-delete/modal-delete.component';

import { Subscription } from 'rxjs';
import { mergeMap, take, map, filter } from 'rxjs/operators';

import assign from 'lodash-es/assign';


@Component({
  selector: 'sp-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit, OnDestroy {
  public tableTitle = 'Таблица менеджеров';

  public tableColumns;
  public managerList = [];

  public isManagersLoaded: boolean = false;

  public managerListSubscription: Subscription;
  public managerLoadSubscription: Subscription;

  constructor(
    private dialog: NbDialogService,
    private userService: UserService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this._setTableColumns();

    this._initManagers();
    this._loadManagers();
  }

  public ngOnDestroy() {
    !!this.managerListSubscription && this.managerListSubscription.unsubscribe();
    !!this.managerLoadSubscription && this.managerLoadSubscription.unsubscribe();
  }

  public onCreateManager(event) {
    this.dialog.open(ManagerModalComponent, { context: { action: ActionState.Create, source: null } })
      .onClose.pipe(
        filter(data => !!data),
        mergeMap(dataFromModal => this.userService.create(dataFromModal)),
        take(1),
      ).subscribe(
        () => this.toastService.showToastSuccess('Welcome', 'Добро пожаловать в команду!'),
        () => this.toastService.showToastDanger('Я пыталась', 'Но ничего не вышло'),
      );
  }

  public onAboutManager(event) {
    const selectedManager: Manager = event.data;

    this.dialog.open(ManagerModalComponent, {
      context: { action: ActionState.Details, source: selectedManager }
    });
  }

  public onUpdateManager(event) {
    const selectedManager: Manager = event.data;

    this.dialog.open(ManagerModalComponent,
      { context: { action: ActionState.Update, source: selectedManager } }
    ).onClose.pipe(
      filter(data => !!data),
      map(dataFromModal => assign(selectedManager, dataFromModal)),
      mergeMap(updates => this.userService.update(updates)),
      take(1),
    ).subscribe(
      () => this.toastService.showToastSuccess('Всё получилось', 'Менеджер изменен'),
      () => this.toastService.showToastDanger('Тут что-то не так', 'Не получается изменить менеджера'),
    );
  }

  public onDeleteManager(event) {
    const { data: { id: managerId } } = event;

    this.dialog.open(ModalDeleteComponent, { context: {}}).onClose.pipe(
      filter(needToDelete => !!needToDelete),
      mergeMap(() => this.userService.delete(managerId)),
      take(1),
    ).subscribe(
      () => this.toastService.showToastSuccess('Удалили', 'Надеюсь он не сделал ничего плохого'),
      () => this.toastService.showToastDanger('Опять ошибка', 'Может быть, дать человеку второй шанс?'),
    );
  }

  private _initManagers() {
    this.managerListSubscription = this.userService.list.subscribe((users) => {
      this.managerList = [];
      if (users && users.length > 0) {
        this.managerList = this.managerList.concat(users);
      }
    });
  }

  private _loadManagers() {
    this.isManagersLoaded = false;

    this.managerLoadSubscription = this.userService
      .load({ queryParams: { role: UserRoles.Manager }, forceLoad: true })
      .subscribe({
        next: users => {
          this.managerList = [];
          if (users && users.length > 0) {
            this.managerList = this.managerList.concat(users);
          }
          this.isManagersLoaded = true;
        },
        error: error => {
          this.toastService.showToastDanger('Ой-ёй', 'Менеджеры не загрузились');
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
