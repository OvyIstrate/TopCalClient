import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/users.service';

@Injectable()

export class UserResolver implements Resolve<any> {

    constructor(private userService:UserService){

    }

    resolve(route:ActivatedRouteSnapshot) {
        return this.userService.getUser(route.params['id']);
    }
}