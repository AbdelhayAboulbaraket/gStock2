import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductStockListComponent } from './components/product-stock-list/product-stock-list.component';

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductStockListComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}
