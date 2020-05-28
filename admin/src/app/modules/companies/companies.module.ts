import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbDialogModule, NbListModule } from '@nebular/theme';
import { SmartTableModule } from 'src/app/@shared/smart-table/smart-table.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';

import { CompaniesRoutingModule } from './companies-routing.module';
import { AutocompleteModule } from 'src/app/@shared/components/autocomplete/autocomplete.module';

import { CompaniesComponent } from './companies.component';

import { FormatAddressModule } from 'src/app/@core/utils/format-address/format-address.module';

import { CompaniesRenderManagerComponent } from './components/render-manager/render-manager.component';
import { CompaniesRenderClientsComponent } from './components/render-clients/render-clients.component';
import { CompaniesRenderLegalPeopleComponent } from './components/render-legal-people/render-legal-people.component';
import { CompaniesRenderAddressesComponent } from './components/render-addresses/render-addresses.component';
import { TabAddressRenderCourierComponent } from './components/render-courier/render-courier.component';

import { CompaniesModalTabsComponent } from './components/modal-tabs/modal-tabs.component';
import { CompaniesModalClientComponent } from './components/modal-client/modal-client.component';
import { ModalLegalPersonComponent } from './components/modal-legal-person/modal-legal-person.component';
import { ModalAddressComponent } from './components/modal-address/modal-address.component';

import { CompaniesTabBasicInfoComponent } from './components/tab-basic-info/tab-basic-info.component';
import { CompaniesTabClientsComponent } from './components/tab-clients/tab-clients.component';
import { CompaniesTabAddressesComponent } from './components/tab-addresses/tab-addresses.component';
import { CompaniesTabLegalPeopleComponent } from './components/tab-legal-people/tab-legal-people.component';


@NgModule({
  declarations: [
    CompaniesComponent,

    CompaniesRenderManagerComponent,
    CompaniesRenderClientsComponent,
    CompaniesRenderLegalPeopleComponent,
    CompaniesRenderAddressesComponent,
    TabAddressRenderCourierComponent,

    CompaniesModalTabsComponent,
    CompaniesModalClientComponent,
    ModalLegalPersonComponent,
    ModalAddressComponent,

    CompaniesTabBasicInfoComponent,
    CompaniesTabClientsComponent,
    CompaniesTabAddressesComponent,
    CompaniesTabLegalPeopleComponent,
  ],
  imports: [
    CommonModule,

    ThemeModule,
    NbListModule,

    FormsModule,
    ReactiveFormsModule,

    SmartTableModule,
    AutocompleteModule,

    FormatAddressModule,

    NbDialogModule.forChild({
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true,
      autoFocus: true,
    }),

    CompaniesRoutingModule,
  ],
  entryComponents: [
    CompaniesRenderManagerComponent,
    CompaniesRenderClientsComponent,
    CompaniesRenderLegalPeopleComponent,
    CompaniesRenderAddressesComponent,
    TabAddressRenderCourierComponent,

    CompaniesModalTabsComponent,
    CompaniesModalClientComponent,
    ModalLegalPersonComponent,
    ModalAddressComponent,
  ],
  providers: []
})
export class CompaniesModule { }
