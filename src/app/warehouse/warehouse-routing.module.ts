import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseFormComponent } from './components/warehouse-form/warehouse-form.component';
import { WarehouseItemComponent } from './components/warehouse-item/warehouse-item.component';
import { AuthGaurdService } from '../authentification/services/auth-gaurd.service';
import { MouvementListComponent } from '../mouvement/components/mouvement-list/mouvement-list.component';

const routes: Routes = [
  {
    path: 'warehouseForm',
    component: WarehouseFormComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'mouvements',
    component: MouvementListComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'warehouse/:id',
    component: WarehouseItemComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
