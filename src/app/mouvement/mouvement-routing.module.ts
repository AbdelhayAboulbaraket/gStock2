import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MouvementFormComponent } from './components/mouvement-form/mouvement-form.component';

const routes: Routes = [
  {
    path: 'mouvementForm',
    component: MouvementFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MouvementRoutingModule {}
