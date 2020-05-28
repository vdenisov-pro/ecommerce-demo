import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagersComponent } from './managers.component';

const routes: Routes = [
  {
    path: '',
    component: ManagersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {
}
