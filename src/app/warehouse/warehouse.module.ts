import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseItemComponent } from './components/warehouse-item/warehouse-item.component';
import { WarehouseFormComponent } from './components/warehouse-form/warehouse-form.component';
import { WarehouseListComponent } from './components/warehouse-list/warehouse-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WarehouseItemComponent,
    WarehouseFormComponent,
    WarehouseListComponent,
  ],
  imports: [CommonModule, WarehouseRoutingModule, SharedModule],
})
export class WarehouseModule {}
