import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { AuthGaurdService } from '../authentification/services/auth-gaurd.service';
import { ProductStockListComponent } from './components/product-stock-list/product-stock-list.component';

const routes: Routes = [
  {
    path: 'productForm',
    component: ProductFormComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'productItem',
    component: ProductItemComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'stock/:id/products',
    component: ProductStockListComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
