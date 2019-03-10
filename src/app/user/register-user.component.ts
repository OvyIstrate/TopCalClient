import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IRegisterUser } from './user.model';
import { FormControl, Validators, FormGroup, EmailValidator, Validator } from '@angular/forms';
import { PasswordValidator } from '../validators/password-validator.directive';

@Component({
    selector: 'register-user',
    templateUrl: './register-user.component.html',
    styleUrls:['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
    registerForm:FormGroup
    passwordFormGroup:FormGroup
    private firstName:FormControl
    private lastName:FormControl
    private userName:FormControl
    private password:FormControl
    private confirm:FormControl
    private email:FormControl

    newUser
    isDirty:boolean = true;
    registerMessage;

    constructor(private router:Router, private authService:AuthService) { }

    ngOnInit(): void {
        this.firstName = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.lastName = new FormControl(null,  [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.userName = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
        this.password = new FormControl(null, [Validators.required]);
        this.confirm = new FormControl(null, [Validators.required]);
        this.email = new FormControl(null, [Validators.required, Validators.email]);

        this.passwordFormGroup = new FormGroup({
            password: this.password,
            confirm: this.confirm,
        }, PasswordValidator.validate.bind(this));

        this.registerForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            passwordFormGroup:this.passwordFormGroup
          });
     }

    register(formValues:any)
    {
        let user:IRegisterUser = {
            userName: formValues.userName,
            firstName: formValues.firstName,
            lastName:formValues.lastName,
            password:formValues.passwordFormGroup.password,
            confirm:formValues.passwordFormGroup.confirm,
            email:formValues.email
        };

        this.authService.register(user).subscribe(res => {
            this.isDirty = false;
            this.registerMessage = res;            
        });
    }

    cancel()
    {
        this.router.navigate(['/home'])
    }

    validateFirstName()
    {
        return this.firstName.valid || this.firstName.untouched;

    }
    
    validateLastName()
    {
        return this.lastName.valid || this.lastName.untouched;

    }

    validateUserName()
    {
        return this.userName.valid || this.userName.untouched;

    }

    validateEmail()
    {
        return this.email.valid || this.email.untouched;

    }

    validatePassword()
    {
        return this.password.valid || this.password.untouched;
    }

    validateConfirm()
    {
        return this.confirm.valid || this.confirm.untouched;
    }
}
