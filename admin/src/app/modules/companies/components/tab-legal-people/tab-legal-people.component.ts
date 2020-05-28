import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

import { ModalLegalPersonComponent } from '../modal-legal-person/modal-legal-person.component';
import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';
import { LocalDataSource } from 'ng2-smart-table';

import { Company } from 'src/app/@core/models/company.model';
import { LegalPerson } from 'src/app/@core/models/legal-person.model';

import { CompanyService } from 'src/app/@core/services/api/company/company.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { take, filter, concatMap } from 'rxjs/operators';

import omit from 'lodash-es/omit';
import assign from 'lodash-es/assign';
import isEqual from 'lodash-es/isEqual';

// default settings for smart table
import { defaultSettings } from 'src/app/@shared/smart-table/settings';


@Component({
  selector: 'sp-companies-tab-legal-people',
  templateUrl: './tab-legal-people.component.html',
  styleUrls: ['./tab-legal-people.component.scss']
})
export class CompaniesTabLegalPeopleComponent implements OnInit {
  @Input() action: string;
  @Input() companyId: number;
  @Input() isActionDetails: boolean;

  public tableTitle;
  public tableColumns;
  public tableSettings;

  public legalPersonList: LegalPerson[] = [];
  public source = new LocalDataSource();

  constructor(
    protected ref: NbDialogRef<CompaniesTabLegalPeopleComponent>,
    private dialog: NbDialogService,
    private companyService: CompanyService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this._setTableSettings();
    this._setTableColumns();

    if (this.companyId) {
      this.companyService.getLegalPeople(this.companyId).pipe(take(1))
        .subscribe(data => {
          this.legalPersonList = data.results;
          this.source.load(this.legalPersonList);
        });
    }
  }

  public addLegalPerson() {
    this.dialog.open(ModalLegalPersonComponent, { context: { action: ActionState.Create, source: null } })
      .onClose.pipe(
        filter(data => !!data),
        take(1),
      ).subscribe(
        (legalPerson) => {
          this.legalPersonList.push(legalPerson);
          this.source.load(this.legalPersonList);
        },
        () => this.toastService.showToastDanger('Упс', 'Произошла ошибка'),
      );
  }

  public deleteLegalPerson(event) {
    const legalPerson: LegalPerson = event.data;
    this.legalPersonList = this.legalPersonList.filter(item => !isEqual(item, legalPerson));
    this.source.load(this.legalPersonList);
  }

  public saveChanges() {
    const formattedLegalPeople = this.legalPersonList.map(
      (legalPerson: LegalPerson) => omit(legalPerson, ['id', 'companyId', 'createdAt', 'updatedAt'])
    );

    this.companyService.updateLegalPeople(this.companyId, formattedLegalPeople)
      .pipe(
        concatMap((data) => {
          const cachedCompanyObj: Company = this.companyService.getCachedById(this.companyId);

          const updatedCompanyObj: Company = assign(cachedCompanyObj, {
            addresses: data.addresses,
            managerId: cachedCompanyObj.manager.id,
          });

          return this.companyService.update(updatedCompanyObj);
        }),
        take(1),
      )
      .subscribe(
        () => this.toastService.showToastSuccess('Успешно', 'Юр.лица были обновлены'),
        () => this.toastService.showToastDanger('Ошибка', 'Изменения не сохранилиь'),
      );
  }

  public cancel() {
    this.ref.close();
  }

  private _setTableSettings() {
    const customActions = this.isActionDetails ? null : assign(
      {}, defaultSettings.actions, {
        custom: [{ name: ActionState.Remove, title: `<i class="nb-trash"></i>` }]
      }
    );

    this.tableSettings = {
      hideSubHeader: true,
      actions: customActions,
    };
  }

  private _setTableColumns() {
    this.tableColumns = {
      name: {
        title: 'Имя',
        type: 'string',
      },
      type: {
        title: 'Тип',
        type: 'string',
      },
      personDetails: {
        title: 'Реквизиты',
        type: 'string',
      },
    };
  }
}
