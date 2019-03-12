import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router'
import { IUser } from './user.model';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls:['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users:IUser[];

    constructor(private authService:AuthService,
                private userService:UserService,
                private router:Router,
                private route:ActivatedRoute) { }

    ngOnInit(): void {
        if(!this.authService.isAuthenticated())
        {
            this.router.navigate(['user/login']);
            return;
        }

        this.users = this.route.snapshot.data['users'];
     }

     removeUser(user:IUser)
     {
         if(confirm("Are you sure you want to remove: " + user.userName))
         {
            this.userService.removeUser(user.id).subscribe(res => {
                if(res.success)
                {
                    alert(res.message);
                    this.users = this.users.filter(u => u !== user);
                }
                else {
                    alert("An error occured when removing an user");
                }
            });
         }
     }
}
