import { Injectable } from '@angular/core'
import { IUser, Role, IRegisterUser } from '../user/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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

  updateCurrentUser(firstName:string, lastName:string) {
    this.currentUser.firstName = firstName
    this.currentUser.lastName = lastName

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  logout() {
    this.currentUser = undefined;

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    localStorage.removeItem('identity');
  }
  
}