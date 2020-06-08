import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { StockListComponent } from './components/stock-list/stock-list.component';

const routes: Routes = [
  {
    path: 'stockForm',
    component: StockFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
