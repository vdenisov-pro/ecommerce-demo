import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';
import { NbDialogService } from '@nebular/theme';

import { Company } from 'src/app/@core/models/company.model';

import { CompanyService } from 'src/app/@core/services/api/company/company.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { CompaniesModalTabsComponent } from './components/modal-tabs/modal-tabs.component';
import { ModalDeleteComponent } from 'src/app/@shared/smart-table/components/modal-delete/modal-delete.component';

import { CompaniesRenderManagerComponent } from './components/render-manager/render-manager.component';
import { CompaniesRenderClientsComponent } from './components/render-clients/render-clients.component';
import { CompaniesRenderAddressesComponent } from './components/render-addresses/render-addresses.component';
import { CompaniesRenderLegalPeopleComponent } from './components/render-legal-people/render-legal-people.component';

import { Subscription } from 'rxjs';
import { mergeMap, filter, take } from 'rxjs/operators';


@Component({
  selector: 'sp-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, OnDestroy {
  public tableTitle; // = 'Таблица компаний';

  public tableColumns;
  public companiesList = [];

  public isCompaniesLoaded: boolean = false;

  public companiesListSubscription: Subscription;
  public companiesLoadSubscription: Subscription;

  public companiesRelatedUpdatesSub: Subscription;

  constructor(
    private dialog: NbDialogService,
    private companyService: CompanyService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this._setTableColumns();

    this._initCompanies();
    this._loadCompanies();
  }

  ngOnDestroy() {
    !!this.companiesListSubscription && this.companiesListSubscription.unsubscribe();
    !!this.companiesLoadSubscription && this.companiesLoadSubscription.unsubscribe();

    !!this.companiesRelatedUpdatesSub && this.companiesRelatedUpdatesSub.unsubscribe();
  }

  public onCreateCompany(event) {
    this.dialog.open(CompaniesModalTabsComponent, {
      context: { action: ActionState.Create, source: null },
    });
  }

  public onAboutCompany(event) {
    const selectedCompany: Company = event.data;

    this.dialog.open(CompaniesModalTabsComponent, {
      context: { action: ActionState.Details, source: selectedCompany }
    });
  }

  public onUpdateCompany(event) {
    const selectedCompany: Company = event.data;

    this.dialog.open(CompaniesModalTabsComponent, {
      context: { action: ActionState.Update, source: selectedCompany },
    });
  }

  public onDeleteCompany(event) {
    const {data: { id: companyId} } = event;

    this.dialog.open(ModalDeleteComponent, { context: {}}).onClose.pipe(
      filter(needToDelete => !! needToDelete),
      mergeMap(() => this.companyService.delete(companyId)),
      take(1),
    ).subscribe(
      () => this.toastService.showToastSuccess('Успешно', 'Компания удалена'),
      () => this.toastService.showToastDanger('Ошибка', 'Компания не удалена')
    );
  }

  private _initCompanies() {
    this.companiesListSubscription = this.companyService.list.subscribe((companies) => {
      this.companiesList = [];

      if (companies && companies.length > 0) {
        this.companiesList = this.companiesList.concat(companies);
      }
    });
  }

  private _loadCompanies() {
    this.isCompaniesLoaded = false;

    this.companiesLoadSubscription = this.companyService.load().subscribe({
      next: companies => {
        this.companiesList = [];

        if (companies && companies.length > 0) {
          this.companiesList = this.companiesList.concat(companies);
        }
        this.isCompaniesLoaded = true;
      },
      error: error => {
        this.toastService.showToastDanger('Ошибка', 'Компании не загрузились');
      }
    });
  }

  private _setTableColumns() {
    this.tableColumns = {
      name: {
        title: 'Название',
        type: 'string',
      },
      manager: {
        title: 'Менеджер',
        type: 'custom',
        editable: false,
        renderComponent: CompaniesRenderManagerComponent,
      },
      clients: {
        title: 'Клиенты',
        type: 'custom',
        editable: false,
        renderComponent: CompaniesRenderClientsComponent,
      },
      legalPeople: {
        title: 'Юридические лица',
        type: 'custom',
        editable: false,
        renderComponent: CompaniesRenderLegalPeopleComponent,
      },
      addresses: {
        title: 'Адреса',
        type: 'custom',
        editable: false,
        renderComponent: CompaniesRenderAddressesComponent,
      },
    };
  }
}
