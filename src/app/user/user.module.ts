import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { userRoutes } from './user.routes'
import { UserSettingsComponent } from './user-settings.component'
import { LoginComponent } from './login.component'
import { RegisterUserComponent } from './register-user.component';
import { CreateUserComponent } from './create-user.component';
import { UserListComponent } from './user-list.component';
import { UserService } from '../services/users.service';
import { UserListResolver } from './user-list.resolver';
import { UserEditComponent } from './user-edit.component';
import { UserResolver } from './user.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    UserSettingsComponent,
    LoginComponent,
    RegisterUserComponent,
    CreateUserComponent,
    UserEditComponent,
    UserListComponent
  ],
  providers: [
    UserService,
    UserListResolver,
    UserResolver
  ]
})
export class UserModule { }