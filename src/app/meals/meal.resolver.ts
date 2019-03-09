import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { MealService } from '../services/meal.service';
import { IMeal } from './meal.models';

@Injectable()
export class MealResolver implements Resolve<IMeal> {
  constructor(private mealService:MealService) {

  }

  resolve(route : ActivatedRouteSnapshot) {
    return this.mealService.getMeal(route.params['id']);
  }
}