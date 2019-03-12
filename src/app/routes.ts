import { Routes } from '@angular/router'
import { CreateMealComponent } from './meals/create-meal.component';
import { MealListComponent } from './meals/meal-list.component';
import { MealDetailsComponent } from './meals/meal-edit.component';
import { Error404Component } from './errors/404.component';
import { MealListResolver } from './meals/meal-list.resolver';
import { MealResolver } from './meals/meal.resolver';
import { HomeComponent } from './home.component';

export const appRoutes:Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'meals/create', component: CreateMealComponent },
  { path: 'meals', component: MealListComponent, resolve: {meals: MealListResolver}},
  { path: 'meals/:id', component: MealDetailsComponent, resolve: {meal: MealResolver }},
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'user', loadChildren: '../app/user/user.module#UserModule'}
]