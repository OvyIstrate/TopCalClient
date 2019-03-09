import { Injectable } from '@angular/core'
import { IMeal } from '../meals/meal.models';
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

  saveMeal(meal) {
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<IMeal>('/api/meal', meal, options)
      .pipe(catchError(this.handleError<IMeal>('saveMeal')))
  }

  updateMeal(meal:IMeal): any {
    return this.http.put<IMeal>('/api/meal/' + meal.id, meal)
    .pipe(catchError(this.handleError<IMeal>('updateMeal')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}

const EVENTS = [];