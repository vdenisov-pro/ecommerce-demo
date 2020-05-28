import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutocompleteModule } from 'src/app/@shared/components/autocomplete/autocomplete.module';
import { SmartTableModule } from 'src/app/@shared/smart-table/smart-table.module';
import { NbDialogModule, NbListModule, NbDatepickerModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';

import { FormatAddressModule } from 'src/app/@core/utils/format-address/format-address.module';

import { OrdersItemRoutingModule } from './item-routing.module';

import { OrdersItemComponent } from './item.component';
import { ModalPositionComponent } from './components/modal-position/modal-position.component';

import { OrderTabBasicInfoComponent } from './components/tab-basic-info/tab-basic-info.component';
import { OrderTabPositionsComponent } from './components/tab-positions/tab-positions.component';


@NgModule({
  declarations: [
    OrdersItemComponent,
    ModalPositionComponent,

    OrderTabBasicInfoComponent,
    OrderTabPositionsComponent,
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    FormsModule,
    AutocompleteModule,
    SmartTableModule,
    NbListModule,
    NbDatepickerModule,
    ThemeModule,

    FormatAddressModule,

    NbDialogModule.forChild({
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true,
      autoFocus: true,
    }),

    OrdersItemRoutingModule,
  ],
  entryComponents: [
    ModalPositionComponent,
  ],
  providers: []
})
export class OrdersItemModule { }
