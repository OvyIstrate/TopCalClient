import { Injectable } from '@angular/core'
import { IMeal, IMealFilter, IResponse } from '../meals/meal.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class MealService {

    constructor(private http: HttpClient) {

    }
  
  getMeals():Observable<IMeal[]> {
    return this.http.get<IMeal[]>('/api/meal')
    .pipe(catchError(this.handleError<IMeal[]>('getMeals', [])));
  }

  getMeal(id:string):Observable<IMeal> {
    return this.http.get<IMeal>('/api/meal/' + id)
      .pipe(catchError(this.handleError<IMeal>('getMeal')));
  }

  searchMeals(filter:IMealFilter):Observable<IMeal[]> {
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<IMeal[]>('/api/meal/search', filter, options)
    .pipe(catchError(this.handleError<IMeal[]>('searchMeals')));
  }

  saveMeal(meal) {
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<IResponse>('/api/meal', meal, options)
      .pipe(catchError(this.handleError<IResponse>('saveMeal')))
  }

  updateMeal(meal:IMeal): Observable<IResponse> {
    return this.http.put<IResponse>('/api/meal/', meal)
    .pipe(catchError(this.handleError<IResponse>('updateMeal')));
  }

  removeMeal(mealId:string): Observable<IResponse> {
    return this.http.delete<IResponse>('/api/meal/'+ mealId)
    .pipe(catchError(this.handleError<IResponse>('removeMeal')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}

const EVENTS = [];