import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/@shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SmartTableModule } from 'src/app/@shared/smart-table/smart-table.module';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    SmartTableModule,
    UsersRoutingModule,
  ],
  exports: [],
  entryComponents: [],
  providers: []
})

export class UsersModule {}
