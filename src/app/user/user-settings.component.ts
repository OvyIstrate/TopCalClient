import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Router} from '@angular/router'
import { IUserSettings } from './user.model';
import { Toastr, TOASTR_TOKEN } from '../services/toastr.service';

@Component({
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  settingsForm:FormGroup
  private firstName:FormControl
  private lastName:FormControl
  private caloriesTarget:FormControl

  constructor(private router:Router,
    private authService:AuthService,
    @Inject(TOASTR_TOKEN) private toastr:Toastr) {
  
  }

  ngOnInit() {
    if(!this.authService.isAuthenticated())
    {
      this.router.navigate(['user/login']);
      return;
    }

    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
    this.caloriesTarget = new FormControl(this.authService.currentUser.caloriesTarget, Validators.required);

    this.settingsForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      caloriesTarget: this.caloriesTarget
    })
  }

  saveSettings(userSettings:IUserSettings) {
    if (this.settingsForm.valid) {
      this.authService.updateUserSettings(userSettings).subscribe(res =>{
        if(res.success)
        {
          this.toastr.success(res.message);
          this.router.navigate(["/home"]);
        }
        else {
          this.toastr.error("An error has occured when updating the user settings");
        }
      })
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }
  
  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  validateCaloriesTarget(){
    return this.caloriesTarget.valid || this.caloriesTarget.untouched;
  }

  cancel() {
    this.router.navigate(['meals'])
  }
       
}