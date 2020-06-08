import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderFormComponent } from './components/provider-form/provider-form.component';
import { ProviderItemComponent } from './components/provider-item/provider-item.component';
import { AuthGaurdService } from '../authentification/services/auth-gaurd.service';

const routes: Routes = [
  {
    path: 'providerForm',
    component: ProviderFormComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'provider/:id',
    component: ProviderItemComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule {}
