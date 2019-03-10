import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../services/users.service';

@Injectable()

export class UserListResolver implements Resolve<any> {

    constructor(private userService:UserService){

    }

    resolve() {
        return this.userService.getUsers();
    }
}