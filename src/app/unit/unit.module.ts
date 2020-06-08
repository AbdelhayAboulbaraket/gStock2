import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { UnitFormComponent } from './components/unit-form/unit-form.component';
import { UnitItemComponent } from './components/unit-item/unit-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UnitListComponent, UnitFormComponent, UnitItemComponent],
  imports: [CommonModule, UnitRoutingModule, SharedModule],
})
export class UnitModule {}
