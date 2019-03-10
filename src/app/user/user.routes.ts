import { UserSettingsComponent } from './user-settings.component'
import { LoginComponent } from './login.component'
import { RegisterUserComponent } from './register-user.component';
import { CreateUserComponent } from './create-user.component';
import { UserListComponent } from './user-list.component';
import { UserListResolver } from './user-list.resolver';
import { UserEditComponent } from './user-edit.component';
import { UserResolver } from './user.resolver';

export const userRoutes = [
  {path: 'settings', component: UserSettingsComponent},
  {path: 'list', component: UserListComponent, resolve: {users:UserListResolver}},
  {path: 'edit/:id', component:UserEditComponent, resolve: {user:UserResolver}},
  {path: 'register', component: RegisterUserComponent},
  {path: 'create', component:CreateUserComponent},
  {path: 'login', component: LoginComponent}
]