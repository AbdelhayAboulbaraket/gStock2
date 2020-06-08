import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitFormComponent } from './components/unit-form/unit-form.component';
import { UnitItemComponent } from './components/unit-item/unit-item.component';
import { AuthGaurdService } from '../authentification/services/auth-gaurd.service';

const routes: Routes = [
  {
    path: 'unitForm',
    component: UnitFormComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'unit/:id',
    component: UnitItemComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitRoutingModule {}
