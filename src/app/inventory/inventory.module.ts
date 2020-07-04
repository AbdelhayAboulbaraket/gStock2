import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { SharedModule } from '../shared/shared.module';
import { DescriptionFormDialogComponent } from './components/description-form-dialog/description-form-dialog.component';

@NgModule({
  declarations: [InventoryListComponent, InventoryFormComponent, DescriptionFormDialogComponent],
  imports: [CommonModule, InventoryRoutingModule, SharedModule],
})
export class InventoryModule {}
