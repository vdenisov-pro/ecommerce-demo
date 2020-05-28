import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersItemComponent } from './item.component';
import { ActionState } from 'src/app/@shared/components/base-modal/base-modal.component';


const routes: Routes = [
  {
    path: `${ActionState.Create}`,
    component: OrdersItemComponent,
  },
  {
    path: `:id/${ActionState.Update}`,
    component: OrdersItemComponent,
  },
  {
    path: `:id/${ActionState.Details}`,
    component: OrdersItemComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersItemRoutingModule { }
