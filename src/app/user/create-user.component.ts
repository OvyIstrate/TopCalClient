import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from './user.model';
import { TOASTR_TOKEN, Toastr } from '../services/toastr.service';

@Component({
    selector: 'create-user',
    templateUrl: './create-user.component.html',
    styleUrls:['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
    createUserForm:FormGroup
    roles:any[]
    private firstName:FormControl
    private lastName:FormControl
    private userName:FormControl
    private email:FormControl
    private role:FormControl
    private caloriesTarget:FormControl
    
    constructor(private userService:UserService,
        private authService:AuthService,
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

            this.roles= ['Admin', 'Manager', 'Regular'];
        }

    ngOnInit(): void {

        this.firstName = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.lastName = new FormControl(null,  [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.userName = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
        this.email = new FormControl(null, [Validators.required, Validators.email]);
        this.role = new FormControl(this.roles[2], [Validators.required]);
        this.caloriesTarget = new FormControl(2500, [Validators.required]);
        
        this.createUserForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            role:this.role,
            caloriesTarget:this.caloriesTarget
          });
     }

     createUser(user:IUser)
     {
        this.userService.saveUser(user).subscribe(res =>{
            if(res.success)
            {
                this.toastr.success(res.message);
                this.router.navigate(["user/list"]);
            }
            else{
                this.toastr.error("An error occured when saving creating an user!");
            }
        })
     }

     cancel(){
         this.router.navigate(['/user/list']);
     }

     validateUserName()
     {
         return this.userName.valid || this.userName.untouched;
 
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
