import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

import { ModalAddressComponent } from '../modal-address/modal-address.component';
import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';
import { LocalDataSource } from 'ng2-smart-table';
import { TabAddressRenderCourierComponent } from '../render-courier/render-courier.component';

import { Address } from 'src/app/@core/models/address.model';
import { Company } from 'src/app/@core/models/company.model';

import { CompanyService } from 'src/app/@core/services/api/company/company.service';
import { ToastService } from 'src/app/@core/services/toast/toast.service';

import { take, filter, concatMap } from 'rxjs/operators';

import omit from 'lodash-es/omit';
import assign from 'lodash-es/assign';
import isEqual from 'lodash-es/isEqual';

// default settings for smart table
import { defaultSettings } from 'src/app/@shared/smart-table/settings';


@Component({
  selector: 'sp-companies-tab-addresses',
  templateUrl: './tab-addresses.component.html',
  styleUrls: ['./tab-addresses.component.scss']
})
export class CompaniesTabAddressesComponent implements OnInit {
  @Input() action: string;
  @Input() companyId: number;
  @Input() isActionDetails: boolean;

  public tableTitle;
  public tableColumns;
  public tableSettings;

  public addressList: Address[] = [];
  public source = new LocalDataSource();

  constructor(
    protected ref: NbDialogRef<CompaniesTabAddressesComponent>,
    private dialog: NbDialogService,
    private companyService: CompanyService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this._setTableSettings();
    this._setTableColumns();

    if (this.companyId) {
      this.companyService.getAddresses(this.companyId).pipe(take(1))
        .subscribe(data => {
          this.addressList = data.results;
          this.source.load(this.addressList);
        });
    }
  }

  public addAddress() {
    this.dialog.open(ModalAddressComponent, { context: { action: ActionState.Create, source: null } })
      .onClose.pipe(
        filter(data => !!data),
        take(1),
      ).subscribe(
        (address) => {
          this.addressList.push(address);
          this.source.load(this.addressList);
        },
        () => this.toastService.showToastDanger('Упс', 'Произошла ошибка'),
      );
  }

  public deleteAddress(event) {
    const address: Address = event.data;
    this.addressList = this.addressList.filter(item => !isEqual(item, address));
    this.source.load(this.addressList);
  }

  public saveChanges() {
    const formattedAddresses = this.addressList.map((address: Address) => {
      const courierId = address.courier.id;
      return assign(
        omit(address, ['id', 'cityId', 'companyId', 'createdAt', 'updatedAt', 'courier']),
        { courierId },
      );
    });

    this.companyService.updateAddresses(this.companyId, formattedAddresses)
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
        () => this.toastService.showToastSuccess('Успешно', 'Адреса были обновлены'),
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
      country: {
        title: 'Страна',
        type: 'string',
      },
      city: {
        title: 'Город',
        type: 'string',
      },
      street: {
        title: 'Улица',
        type: 'string',
      },
      house: {
        title: 'Дом',
        type: 'string',
      },
      courier: {
        title: 'Курьер',
        type: 'custom',
        editable: false,
        renderComponent: TabAddressRenderCourierComponent,
      }
    };
  }
}
