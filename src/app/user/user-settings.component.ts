import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Router} from '@angular/router'

@Component({
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  settingsForm:FormGroup
  private firstName:FormControl
  private lastName:FormControl
  private caloriesTarget:FormControl

  constructor(private router:Router, private authService:AuthService) {

  }

  ngOnInit() {
    if(!this.authService.isAuthenticated())
    {
      this.router.navigate(['user/login']);
      return;
    }

    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
    this.caloriesTarget = new FormControl(this.authService.currentUser.caloriesTarget);

    this.settingsForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      caloriesTarget: this.caloriesTarget
    })
  }

  saveSettings(formValues) {
    if (this.settingsForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
      this.router.navigate(['meals'])
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched
  }
  
  validateLastName() {
    return this.lastName.valid || this.lastName.untouched
  }

  cancel() {
    this.router.navigate(['meals'])
  }
       
}