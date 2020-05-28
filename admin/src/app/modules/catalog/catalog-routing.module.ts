import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  {
    path: '', component: CatalogComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: '**', redirectTo: 'categories' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
