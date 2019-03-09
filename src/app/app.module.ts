import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { appRoutes } from './routes'
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav/nav-bar.component';
import { AuthService } from './user/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
