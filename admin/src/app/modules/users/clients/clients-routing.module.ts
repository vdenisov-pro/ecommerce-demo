import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';


const routes: Routes = [
  {
    path: '',
    component: ClientsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {
}
