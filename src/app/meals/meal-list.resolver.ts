import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { MealService } from '../services/meal.service';
import { groupBy, mergeMap, tap, map } from 'rxjs/operators';
import { IMeal } from './meal.models';

@Injectable()
export class MealListResolver implements Resolve<any> {
  constructor(private mealService:MealService) {

  }

  resolve() {
    return this.mealService.getMeals().pipe(tap(meals => {
      meals.forEach(function(meal){
        //TODO -> Map here the new grouping criteria.
        meal.dateString = new Date(meal.date).toDateString();
      })
    }));
  }
}