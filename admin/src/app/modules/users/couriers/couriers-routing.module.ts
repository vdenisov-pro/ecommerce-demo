import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CouriersComponent } from './couriers.component';

const routes: Routes = [
  {
    path: '',
    component: CouriersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouriersRoutingModule {
}
