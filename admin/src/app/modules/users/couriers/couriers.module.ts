import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CommonModule } from '@angular/common';
import { CourierModalComponent } from './components/modal/modal.component';
import { CouriersRoutingModule } from './couriers-routing.module';
import { CouriersComponent } from './couriers.component';
import { SmartTableModule } from 'src/app/@shared/smart-table/smart-table.module';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { RenderBtnComponent } from './components/render-btn/render-btn.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    SmartTableModule,
    NbDialogModule.forChild({
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true,
      autoFocus: true,
    }),
    CouriersRoutingModule
  ],
  declarations: [
    CouriersComponent,
    CourierModalComponent,
    RenderBtnComponent,
  ],
  entryComponents: [
    CourierModalComponent,
  ],
  providers: []
})
export class CouriersModule {
}
