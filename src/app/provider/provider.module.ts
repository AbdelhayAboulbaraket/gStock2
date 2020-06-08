import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { ProviderFormComponent } from './components/provider-form/provider-form.component';
import { ProviderItemComponent } from './components/provider-item/provider-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProviderListComponent,
    ProviderFormComponent,
    ProviderItemComponent,
  ],
  imports: [CommonModule, ProviderRoutingModule, SharedModule],
})
export class ProviderModule {}
