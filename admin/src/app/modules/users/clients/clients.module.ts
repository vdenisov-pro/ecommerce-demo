import { NgModule } from '@angular/core';
import { ClientsComponent } from '..';
import { ClientRenderCompanyComponent } from './components/client-render-company/client-render-company.component';
import { ClientModalComponent } from './components/client-modal/client-modal.component';
import { ClientRenderStatusComponent } from './components/client-render-status/client-render-status.component';
import { ClientRenderManagerComponent } from './components/client-render-manager/client-render-manager.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { AutocompleteModule } from 'src/app/@shared/components/autocomplete/autocomplete.module';
import { SmartTableModule } from 'src/app/@shared/smart-table/smart-table.module';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { StatusCustomRenderComponent } from './components/status-select/status-select.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    NbDialogModule.forChild({
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true,
      autoFocus: true,
    }),
    SmartTableModule,
    AutocompleteModule,
    ClientsRoutingModule,
  ],
  declarations: [
    ClientsComponent,
    ClientRenderCompanyComponent,
    ClientRenderStatusComponent,
    ClientRenderManagerComponent,
    ClientModalComponent,
    StatusCustomRenderComponent,
  ],
  entryComponents: [
    ClientRenderCompanyComponent,
    ClientRenderStatusComponent,
    ClientRenderManagerComponent,
    ClientModalComponent,
  ],
  providers: []
})
export class ClientsModule {
}
