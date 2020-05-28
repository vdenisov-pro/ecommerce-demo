import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ModulesComponent } from './modules.component';

const routes: Routes = [{
  path: '',
  component: ModulesComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'catalog',
      loadChildren: () => import('../modules/catalog/catalog.module').then(m => m.CatalogModule)
    },
    {
      path: 'users',
      loadChildren: () => import('../modules/users/users.module').then(m => m.UsersModule)
    },
    {
      path: 'companies',
      loadChildren: () => import('../modules/companies/companies.module').then(m => m.CompaniesModule)
    },
    {
      path: 'orders',
      loadChildren: () => import('../modules/orders/orders.module').then(m => m.OrdersModule)
    },
    {
      path: 'bonus',
      loadChildren: () => import('../modules/bonus/bonus.module').then(m => m.BonusModule)
    },
    {
      path: 'remains',
      loadChildren: () => import('../modules/remains/remains.module').then(m => m.RemainsModule)
    },
    {
      path: 'settings',
      loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
    },
    // TODO: change default route to 'dashboard'
    // { path: '**', redirectTo: '' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {
}
