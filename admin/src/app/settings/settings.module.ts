import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsComponent } from './pages/settings/settings.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { AutocompleteModule } from 'src/app/@shared/components/autocomplete/autocomplete.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, AutocompleteModule],
})
export class SettingsModule {}
