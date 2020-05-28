import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { ModulesComponent } from './modules.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ModulesRoutingModule } from './modules-routing.module';

@NgModule({
  imports: [
    ModulesRoutingModule,
    ThemeModule,
    DashboardModule,
  ],
  declarations: [
    ModulesComponent,
  ],
})
export class ModulesModule {
}
