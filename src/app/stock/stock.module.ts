import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StockListComponent, StockFormComponent],
  imports: [CommonModule, StockRoutingModule, SharedModule],
})
export class StockModule {}
