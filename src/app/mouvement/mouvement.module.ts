import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MouvementRoutingModule } from './mouvement-routing.module';
import { MouvementListComponent } from './components/mouvement-list/mouvement-list.component';
import { MouvementFormComponent } from './components/mouvement-form/mouvement-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MouvementListComponent, MouvementFormComponent],
  imports: [CommonModule, MouvementRoutingModule, SharedModule],
})
export class MouvementModule {}
