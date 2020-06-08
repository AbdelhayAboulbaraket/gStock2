import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserListComponent, UserItemComponent, UserFormComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
