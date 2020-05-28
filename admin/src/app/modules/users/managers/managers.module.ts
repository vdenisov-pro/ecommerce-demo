import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ManagerModalComponent } from './components/modal/modal.component';
import { ManagerRoutingModule } from './managers-routing.module';
import { ManagersComponent } from './managers.component';
import { SmartTableModule } from 'src/app/@shared/smart-table/smart-table.module';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ManagerRenderButtonComponent } from './components/render-btn/render-btn.component';

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
    ManagerRoutingModule
  ],
  declarations: [
    ManagersComponent,
    ManagerModalComponent,
    ManagerRenderButtonComponent,
  ],
  entryComponents: [
    ManagerModalComponent,
  ],
  providers: []
})

export class ManagersModule {
}
