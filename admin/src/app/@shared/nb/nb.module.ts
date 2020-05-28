import { NgModule } from '@angular/core';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDialogModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbTooltipModule,
  NbUserModule,
  NbListModule,
} from '@nebular/theme';

@NgModule({
  declarations: [],
  imports: [
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbContextMenuModule,
    NbInputModule,
    NbLayoutModule,
    NbSelectModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbStepperModule,
    NbTabsetModule,
    NbTooltipModule,
    NbUserModule,
    NbListModule,

    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
  ],

  exports: [
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbContextMenuModule,
    NbInputModule,
    NbLayoutModule,
    NbSelectModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbStepperModule,
    NbTabsetModule,
    NbTooltipModule,
    NbUserModule,
    NbListModule,

    NbDialogModule,
    NbMenuModule,
  ]
})
export class NbModule {}
