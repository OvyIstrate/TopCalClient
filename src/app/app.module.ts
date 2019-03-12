import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { appRoutes } from './routes'
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav/nav-bar.component';
import { AuthService } from './services/auth.service';
import { CreateMealComponent } from './meals/create-meal.component';
import { MealListComponent } from './meals/meal-list.component';
import { MealDetailsComponent } from './meals/meal-edit.component';
import { Error404Component } from './errors/404.component';
import { MealResolver } from './meals/meal.resolver';
import { MealListResolver } from './meals/meal-list.resolver';
import { MealService } from './services/meal.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HomeComponent } from './home.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { GroupByPipe } from './pipes/groupBy.pipe';
import { Toastr, TOASTR_TOKEN } from './services/toastr.service';

let toastr:Toastr = window['toastr'];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CreateMealComponent,
    MealListComponent,
    HomeComponent,
    MealDetailsComponent,
    GroupByPipe,
    Error404Component
  ],
  imports: [
    BrowserModule,
    NgDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    {provide:TOASTR_TOKEN, useValue:toastr},
    { provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true},
    { provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true},
    AuthService,
    MealResolver,
    MealListResolver,
    MealService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateMealComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this meal, do you really want to cancel?')
  return true
}