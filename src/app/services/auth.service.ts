import { Injectable } from '@angular/core'
import { IUser, Role, IRegisterUser, IUserSettings } from '../user/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { IResponse } from '../meals/meal.models';

@Injectable()
export class AuthService {
    
  currentUser:IUser

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string) {

    let loginModel = { userName: userName, password: password };
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

    return this.http.post('/api/auth/token', loginModel, options)
    .pipe(tap(data => {
      this.currentUser = <IUser>data;
      localStorage.setItem('identity', JSON.stringify(this.currentUser));
    }))
    .pipe(catchError(err => {
      return of(false)
    }))
  }

  isAuthenticated() {
    this.currentUser = JSON.parse(localStorage.getItem('identity'));
    return !!this.currentUser;
  }

  hasManagerRole(){
    return this.currentUser.role == Role.admin || this.currentUser.role == Role.manager;
  }

  hasRegularRole()
  {
    return this.currentUser.role == Role.admin || this.currentUser.role == Role.regular;
  }

  register(registerUser: IRegisterUser) {
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<IRegisterUser>('/api/auth/register', registerUser, options);
  }

  updateUserSettings(userSettings:IUserSettings): Observable<IResponse>{
    return this.http.put<IResponse>('/api/auth/settings', userSettings)
    .pipe(tap(data =>{
      this.currentUser.firstName = userSettings.firstName;
      this.currentUser.lastName = userSettings.lastName;
      this.currentUser.caloriesTarget = userSettings.caloriesTarget;

      localStorage.setItem('identity', JSON.stringify(this.currentUser));
    }))
    .pipe(catchError(this.handleError<IResponse>('updateUserSettings')));
  }

  logout() {
    this.currentUser = undefined;

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    localStorage.removeItem('identity');
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
  
}