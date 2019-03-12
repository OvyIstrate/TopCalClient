import { Component, OnInit, Inject } from '@angular/core';
import { IUser, Role } from './user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/users.service';
import { Toastr, TOASTR_TOKEN } from '../services/toastr.service';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
    user:IUser
    editUserForm: FormGroup
    roles: any[];
    private firstName:FormControl
    private lastName:FormControl
    private email:FormControl
    private role:FormControl
    private caloriesTarget:FormControl

    constructor(private userService:UserService,
                private authService:AuthService,
                private route:ActivatedRoute,
                private router:Router,
                @Inject(TOASTR_TOKEN) private toastr:Toastr) {
                
                    if(!this.authService.isAuthenticated())
                    {
                        this.router.navigate(["/user/login"]);
                    }
            
                    if(!this.authService.hasManagerRole())
                    {
                        this.router.navigate(["/home"])
                    }

                this.user = this.route.snapshot.data['user'];
                this.roles = ['Admin', 'Manager', 'Regular'];
     }

    ngOnInit(): void {

        this.firstName = new FormControl(this.user.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.lastName = new FormControl(this.user.lastName, Validators.required)
        this.caloriesTarget = new FormControl(this.user.caloriesTarget);
        this.email = new FormControl(this.user.email, [Validators.required, Validators.email]);
        this.role = new FormControl(this.user.role, [Validators.required]);

        this.editUserForm = new FormGroup({
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email,
            role:this.role,
            caloriesTarget:this.caloriesTarget,
        })    
     }

     updateUser(user:IUser)
     {
         user.id = this.user.id;
         this.userService.updateUser(user).subscribe(res =>{
             if(res.success)
             {
                this.toastr.success(res.message);
                 this.router.navigate(["/user/list"]);
             }
             else {
                 //todo replace with _toastr
                 this.toastr.error("An error has occured when updating the user");
             }
         });
     }

     cancel()
     {
        this.router.navigate(["/user/list"]);
     }

     validateFirstName()
    {
        return this.firstName.valid || this.firstName.untouched;

    }
    
    validateLastName()
    {
        return this.lastName.valid || this.lastName.untouched;

    }

    validateEmail()
    {
        return this.email.valid || this.email.untouched;

    }

    validateCalories()
    {
        return this.caloriesTarget.valid || this.caloriesTarget.untouched;
    }
}
