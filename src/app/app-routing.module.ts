import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductFormComponent } from './product/components/product-form/product-form.component';
import { ProductModule } from './product/product.module';
import { CategoryListComponent } from './category/components/category-list/category-list.component';
import { UnitListComponent } from './unit/components/unit-list/unit-list.component';
import { ProviderListComponent } from './provider/components/provider-list/provider-list.component';
import { WarehouseListComponent } from './warehouse/components/warehouse-list/warehouse-list.component';
import { LoginComponent } from './authentification/components/login/login.component';
import { AuthGaurdService } from './authentification/services/auth-gaurd.service';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { StockListComponent } from './stock/components/stock-list/stock-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'stocks',
    component: StockListComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'units',
    component: UnitListComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'providers',
    component: ProviderListComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'warehouses',
    component: WarehouseListComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
