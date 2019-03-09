import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { MealService } from '../services/meal.service';

@Injectable()
export class MealListResolver implements Resolve<any> {
  constructor(private mealService:MealService) {

  }

  resolve() {
    return this.mealService.getMeals();
  }
}