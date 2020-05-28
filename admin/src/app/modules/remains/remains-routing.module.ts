import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemainsComponent } from './pages';

const routes: Routes = [
  { path: '', component: RemainsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemainsRoutingModule {}
