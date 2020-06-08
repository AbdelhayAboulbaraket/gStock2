import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGaurdService } from '../authentification/services/auth-gaurd.service';

const routes: Routes = [
  {
    path: 'userForm',
    component: UserFormComponent,
    canActivate: [AuthGaurdService],
  },

  {
    path: 'user/:id',
    component: UserItemComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
