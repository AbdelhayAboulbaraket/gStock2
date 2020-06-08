import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { AuthGaurdService } from '../authentification/services/auth-gaurd.service';

const routes: Routes = [
  {
    path: 'categoryForm',
    component: CategoryFormComponent,
    canActivate: [AuthGaurdService],
  },

  {
    path: 'category/:id',
    component: CategoryItemComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
