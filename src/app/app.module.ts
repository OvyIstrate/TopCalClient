import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { appRoutes } from './routes'
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav/nav-bar.component';
import { AuthService } from './services/auth.service';
import { CreateMealComponent } from './meals/create-meal.component';
import { MealListComponent } from './meals/meal-list.component';
import { MealDetailsComponent } from './meals/meal-details.component';
import { Error404Component } from './errors/404.component';
import { MealResolver } from './meals/meal.resolver';
import { MealListResolver } from './meals/meal-list.resolver';
import { MealService } from './services/meal.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CreateMealComponent,
    MealListComponent,
    MealDetailsComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
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