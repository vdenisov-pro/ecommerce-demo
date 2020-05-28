import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BonusComponent } from './pages';

const routes: Routes = [
  { path: '', component: BonusComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonusRoutingModule {}
