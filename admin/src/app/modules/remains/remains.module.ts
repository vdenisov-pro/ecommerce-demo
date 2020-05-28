import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemainsRoutingModule } from './remains-routing.module';

import { RemainsComponent } from './pages';

@NgModule({
  declarations: [RemainsComponent],
  imports: [CommonModule, RemainsRoutingModule]
})
export class RemainsModule {}
