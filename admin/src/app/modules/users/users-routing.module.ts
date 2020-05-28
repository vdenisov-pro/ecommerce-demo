import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'managers',
        loadChildren: () => import('./managers/managers.module').then(m => m.ManagersModule)
      },
      {
        path: 'couriers',
        loadChildren: () => import('./couriers/couriers.module').then(m => m.CouriersModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: '**',
        redirectTo: 'managers'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
