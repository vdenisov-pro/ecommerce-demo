import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

import { Company } from 'src/app/@core/models/company.model';

import { CompanyService } from 'src/app/@core/services/api/company/company.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import {
  BaseModalComponent,
  IBaseModalComponent,
  ActionState,
} from 'src/app/@shared/components/base-modal/base-modal.component';

import { take } from 'rxjs/operators';

import assign from 'lodash-es/assign';


@Component({
  selector: 'sp-companies-modal-tabs',
  templateUrl: './modal-tabs.component.html',
  styleUrls: ['./modal-tabs.component.scss']
})
export class CompaniesModalTabsComponent extends BaseModalComponent<Company>
implements OnInit, IBaseModalComponent {
  public companyId: number;
  public successButtonText: string;
  public modalTitle: string;

  constructor(
    private companyService: CompanyService,
    private toastService: ToastService,
    protected fb: FormBuilder,
    protected ref: NbDialogRef<CompaniesModalTabsComponent>,
  ) {
    super(fb, ref);
  }

  ngOnInit() {
    this.companyId = (this.source) ? this.source.id : null;

    this.actionSelect();
  }

  public createHandler() {
    this.modalTitle = 'Добавить компанию';
  }

  public updateHandler() {
    this.modalTitle = 'Редактировать компанию';
  }

  public detailsHandler() {
    this.modalTitle = 'Подробнее о компании';
  }

  public createCompany(event) {
    const data = event;

    this.companyService.create(data).pipe(take(1)).subscribe(
      (company: Company) => {
        this.companyId = company.id;
        this.toastService.showToastSuccess('Успешно', 'Компания была создана');
      },
      (error) => {
        this.toastService.showToastDanger('Ошибка', 'Компания не создалась');
      }
    );
  }

  public updateCompany(event) {
    const updates: Company = assign(this.source, event);

    this.companyService.update(updates).pipe(take(1)).subscribe(
      (company: Company) => {
        this.companyId = company.id;
        this.toastService.showToastSuccess('Успешно', 'Компания была обновлена');
      },
      (error) => {
        this.toastService.showToastDanger('Ошибка', 'Компания не обновилась');
      }
    );
  }

  get isActionDetails() {
    return this.action === ActionState.Details;
  }
}
