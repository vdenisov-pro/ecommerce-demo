import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartTableModule } from 'src/app/@shared/smart-table/smart-table.module';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';

import { FormatAddressModule } from 'src/app/@core/utils/format-address/format-address.module';

import { OrdersListRoutingModule } from './list-routing.module';

import { OrdersListComponent } from './list.component';

import { OrdersRenderCreatedAtComponent } from './components/render-created-at/render-created-at.component';
import { OrdersRenderCompanyComponent } from './components/render-company/render-company.component';
import { OrdersRenderManagerComponent } from './components/render-manager/render-manager.component';
import { OrdersRenderAuthorComponent } from './components/render-author/render-author.component';
import { OrdersRenderAddressComponent } from './components/render-address/render-address.component';
import { OrdersRenderDeliveryDateComponent } from './components/render-delivery-date/render-delivery-date.component';
import { OrdersRenderStatusComponent } from './components/render-status/render-status.component';

import { ModalCancelComponent } from './components/modal-cancel/modal-cancel.component';


@NgModule({
  declarations: [
    OrdersListComponent,

    OrdersRenderCreatedAtComponent,
    OrdersRenderCompanyComponent,
    OrdersRenderManagerComponent,
    OrdersRenderAuthorComponent,
    OrdersRenderAddressComponent,
    OrdersRenderDeliveryDateComponent,
    OrdersRenderStatusComponent,

    ModalCancelComponent,
  ],
  imports: [
    CommonModule,

    SmartTableModule,
    ThemeModule,

    FormatAddressModule,

    NbDialogModule.forChild({
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true,
      autoFocus: true,
    }),

    OrdersListRoutingModule,
  ],
  entryComponents: [
    OrdersRenderCreatedAtComponent,
    OrdersRenderCompanyComponent,
    OrdersRenderManagerComponent,
    OrdersRenderAuthorComponent,
    OrdersRenderAddressComponent,
    OrdersRenderDeliveryDateComponent,
    OrdersRenderStatusComponent,

    ModalCancelComponent,
  ],
  providers: []
})
export class OrdersListModule { }
