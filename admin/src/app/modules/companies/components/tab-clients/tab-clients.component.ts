import { Component, OnInit, Input } from '@angular/core';
import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';
import { LocalDataSource } from 'ng2-smart-table';

import { Client } from 'src/app/@core/models/user.model';

import { CompanyService } from 'src/app/@core/services/api/company/company.service';

import { take } from 'rxjs/operators';


@Component({
  selector: 'sp-companies-tab-clients',
  templateUrl: './tab-clients.component.html',
  styleUrls: ['./tab-clients.component.scss']
})
export class CompaniesTabClientsComponent implements OnInit {
  @Input() action: string;
  @Input() companyId: number;

  public tableTitle;
  public tableColumns;
  public tableSettings;

  public clientList: Client[] = [];
  public source = new LocalDataSource();

  constructor(
    private companyService: CompanyService,
  ) { }

  ngOnInit() {
    this._setTableSettings();
    this._setTableColumns();

    if (this.companyId) {
      this.companyService.getClients(this.companyId).pipe(take(1))
        .subscribe(data => {
          this.clientList = data.results;
          this.source.load(this.clientList);
        });
    }
  }

  get isActionDetails() {
    return this.action === ActionState.Details;
  }

  private _setTableSettings() {
    this.tableSettings = {
      hideSubHeader: true,
      actions: null,
    };
  }

  private _setTableColumns() {
    this.tableColumns = {
      name: {
        title: 'Имя',
        type: 'string',
      },
      phone: {
        title: 'Телефон',
        type: 'string',
      },
      email: {
        title: 'Почта',
        type: 'string',
      },
    };
  }
}
