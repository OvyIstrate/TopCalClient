import { Routes } from '@angular/router'
import { CreateMealComponent } from './meals/create-meal.component';
import { MealListComponent } from './meals/meal-list.component';
import { MealDetailsComponent } from './meals/meal-details.component';
import { Error404Component } from './errors/404.component';
import { MealListResolver } from './meals/meal-list.resolver';
import { MealResolver } from './meals/meal.resolver';

export const appRoutes:Routes = [
  { path: 'meals/new', component: CreateMealComponent },
  { path: 'meals', component: MealListComponent},
  { path: 'meals/:id', component: MealDetailsComponent, resolve: {meal: MealResolver }},
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/meals', pathMatch: 'full'},
  { path: 'user', loadChildren: '../app/user/user.module#UserModule'}
]