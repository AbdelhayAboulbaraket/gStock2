import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';

import { SharedModule } from '../shared/shared.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent, CategoryItemComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
})
export class CategoryModule {}
