import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';

import { OrdersComponent } from './orders.component';


@NgModule({
  declarations: [
    OrdersComponent,
  ],
  imports: [
    CommonModule,

    ThemeModule,

    NbDialogModule.forChild({
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true,
      autoFocus: true,
    }),

    OrdersRoutingModule,
  ],
  entryComponents: [],
  providers: []
})
export class OrdersModule { }
