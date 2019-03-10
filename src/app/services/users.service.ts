import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../user/user.model';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        return this.http.post<IUser>('/api/auth/create', user, options)
          .pipe(catchError(this.handleError<IUser>('saveUser')))
      }
    
      updateUser(user:IUser): any {
        return this.http.put<IUser>('/api/auth', user)
        .pipe(catchError(this.handleError<IUser>('updateUser')));
      }

      removeUser(userId: string): any {
          let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
          return this.http.delete('/api/auth/' + userId, options)
          .pipe(catchError(this.handleError<IUser>('removeUser')));
        }
    
      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          return of(result as T);
        }
      }
}