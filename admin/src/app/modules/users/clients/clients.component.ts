import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserRoles, Client } from 'src/app/@core/models/user.model';

import { NbDialogService } from '@nebular/theme';
import { UserService } from 'src/app/@core/services/api/user/user.service';
import { CompanyService } from 'src/app/@core/services/api/company/company.service';

import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { ClientRenderCompanyComponent } from './components/client-render-company/client-render-company.component';
import { ClientRenderStatusComponent } from './components/client-render-status/client-render-status.component';
import { ClientRenderManagerComponent } from './components/client-render-manager/client-render-manager.component';

import { ClientModalComponent } from './components/client-modal/client-modal.component';
import { ModalDeleteComponent } from 'src/app/@shared/smart-table/components/modal-delete/modal-delete.component';
import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';

import { Subscription } from 'rxjs';
import { mergeMap, take, map, filter } from 'rxjs/operators';

import assign from 'lodash-es/assign';


@Component({
  selector: 'sp-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {
  public tableTitle = 'Таблица клиентов';

  public tableColumns;
  public clientList = [];

  public isClientsLoaded: boolean = false;

  public clientListSubscription: Subscription;
  public clientLoadSubscription: Subscription;

  constructor(
    private dialog: NbDialogService,
    private userService: UserService,
    private companyService: CompanyService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this._setTableColumns();

    this._initClients();
    this._loadClients();
  }

  public ngOnDestroy() {
    !!this.clientListSubscription && this.clientListSubscription.unsubscribe();
    !!this.clientLoadSubscription && this.clientLoadSubscription.unsubscribe();
  }

  public onCreateClient(event) {
    this.dialog.open(ClientModalComponent, { context: { action: ActionState.Create, source: null }})
      .onClose.pipe(
        filter(data => !!data),
        mergeMap(dataFromModal => this.userService.create(dataFromModal)),
        mergeMap(updates => this.companyService.loadById(updates.companyId)),
        take(1),
      ).subscribe(
        () => this.toastService.showToastSuccess('Добавили клиента', 'Больше клиентов - больше прибыли'),
        () => this.toastService.showToastDanger('Что-то не так', 'Точно всё правильно ввели?'),
      );
  }

  public onAboutClient(event) {
    const selectedClient: Client = event.data;

    this.dialog.open(ClientModalComponent, {
      context: { action: ActionState.Details, source: selectedClient }
    });
  }

  public onUpdateClient(event) {
    const selectedClient: Client = event.data;

    this.dialog.open(ClientModalComponent, { context: { action: ActionState.Update, source: selectedClient }})
      .onClose.pipe(
        filter(data => !!data),
        map(dataFromModal => {
          assign(selectedClient, dataFromModal);
          delete selectedClient.company;
          delete selectedClient.manager;
          return selectedClient;
        }),
        mergeMap(updates => this.userService.update(updates)),
        mergeMap(updates => this.companyService.loadById(updates.companyId)),
        take(1),
      ).subscribe(
        () => this.toastService.showToastSuccess('Клиент изменен', 'Изменения всегда к лучшему!'),
        () => this.toastService.showToastDanger('Привет, Я - Ошибка!', 'Не получилось изменить клиента'),
      );
  }

  public onDeleteClient(event) {
    const { data: { id: clientId, companyId } } = event;

    this.dialog.open(ModalDeleteComponent, { context: {}})
      .onClose.pipe(
        filter(needToDelete => !!needToDelete),
        mergeMap(() => this.userService.delete(clientId)),
        mergeMap(() => this.companyService.loadById(companyId)),
        take(1),
      ).subscribe(
        () => this.toastService.showToastSuccess('А мне он нравился', 'Надеюсь вы уже нашли замену'),
        () => this.toastService.showToastDanger('Опять ошибка!', 'Может быть, оставить этого клиента?'),
      );
  }

  private _initClients() {
    this.clientListSubscription = this.userService.list.subscribe((users) => {
      this.clientList = [];
      if (users && users.length > 0) {
        this.clientList = this.clientList.concat(users);
      }
    });
  }

  private _loadClients() {
    this.isClientsLoaded = false;

    this.clientLoadSubscription = this.userService
      .load({ queryParams: { role: UserRoles.Client }, forceLoad: true })
      .subscribe({
        next: users => {
          this.clientList = [];
          if (users && users.length > 0) {
            this.clientList = this.clientList.concat(users);
          }
          this.isClientsLoaded = true;
        },
        error: error => {
          this.toastService.showToastDanger('Ай-яй', 'Клиенты не загрузились');
        }
      });
  }

  private _setTableColumns() {
    this.tableColumns = {
      company: {
        title: 'Компания',
        type: 'custom',
        renderComponent: ClientRenderCompanyComponent,
      },
      status: {
        title: 'Статус',
        width: '50px',
        type: 'custom',
        renderComponent: ClientRenderStatusComponent,
      },
      name: {
        title: 'Имя клиента',
        type: 'string'
      },
      manager: {
        title: 'Менеджер',
        type: 'custom',
        renderComponent: ClientRenderManagerComponent
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
