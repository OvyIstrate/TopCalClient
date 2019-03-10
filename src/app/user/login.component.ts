import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em { float:right; color:#E05C65; padding-left:10px; }
  `]
})
export class LoginComponent {
  username = "admin";
  password = "P@ssw0rd!";
  mouseoverLogin
  loginInvalid = false;

  constructor(private authService:AuthService, private router:Router) {

  }

  login(formValues) {
    this.authService.loginUser(formValues.userName, formValues.password).subscribe(resp => {
      if(!resp)
      {
        this.loginInvalid = true;
      }
      else {
        if(this.authService.hasRegularRole()){
          this.router.navigate(['meals']);      
        }
        else {
          this.router.navigate(['user/list']);
        }
      }
    })
  }

  cancel() {
    this.router.navigate(['home'])
  }
}