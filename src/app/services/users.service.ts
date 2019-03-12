import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser, IUserSettings } from '../user/user.model';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponse } from '../meals/meal.models';

@Injectable()
export class UserService {
    

    constructor(private http:HttpClient) {
        
    }

    getUsers():Observable<IUser[]> {
        return this.http.get<IUser[]>('/api/auth')
        .pipe(catchError(this.handleError<IUser[]>('getUsers', [])));
      }
    
      getUser(id:string):Observable<IUser> {
        return this.http.get<IUser>('/api/auth/' + id)
          .pipe(catchError(this.handleError<IUser>('getUser')));
      }
    
      saveUser(user:IUser) {
        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.post<IResponse>('/api/auth/create', user, options)
          .pipe(catchError(this.handleError<IResponse>('saveUser')))
      }
    
      updateUser(user:IUser): Observable<IResponse> {
        return this.http.put<IResponse>('/api/auth', user)
        .pipe(catchError(this.handleError<IResponse>('updateUser')));
      }

      updateUserSettings(userSettings:IUserSettings): Observable<IResponse>{
        return this.http.put<IResponse>('/api/auth/settings', userSettings)
        .pipe(catchError(this.handleError<IResponse>('updateUserSettings')));
      }

      removeUser(userId: string): Observable<IResponse> {
          let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
          return this.http.delete<IResponse>('/api/auth/' + userId, options)
          .pipe(catchError(this.handleError<IResponse>('removeUser')));
        }
    
      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          return of(result as T);
        }
      }
}