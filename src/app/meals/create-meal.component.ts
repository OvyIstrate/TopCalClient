import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { IMeal } from './meal.models';
import { TOASTR_TOKEN, Toastr } from '../services/toastr.service';

@Component({
    selector: 'create-meal',
    templateUrl: './create-meal.component.html',
    styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {
    isDirty: any;
    
    createMealForm:FormGroup
    date:FormControl
    description:FormControl
    time:FormControl
    numberOfCalories:FormControl
    
    constructor(private authService:AuthService,
                private mealService:MealService,
                private router:Router,
                @Inject(TOASTR_TOKEN) private toastr:Toastr) {
        if(!authService.isAuthenticated())
        {
            router.navigate(["/home"]);
        }
        if(!authService.hasRegularRole())
        {
            router.navigate(["/users"]);
        }
     }

    ngOnInit(): void {
        this.date = new FormControl(new Date(), [Validators.required])
        this.description = new FormControl('', [Validators.required])
        this.time = new FormControl('', [Validators.required])
        this.numberOfCalories = new FormControl(0, [Validators.required, Validators.max(4000)])
        
        this.createMealForm = new FormGroup({
            date:this.date,
            description:this.description,
            time:this.time,
            numberOfCalories:this.numberOfCalories
        })
     }

    createMeal(meal:IMeal)
    {
        this.mealService.saveMeal(meal).subscribe(res =>{
            if(res.success)
            {
                this.toastr.success(res.message);
                this.router.navigate(["/meals"])
            }
            else {
                this.toastr.error("An error occured when creating a meal!");
            }
        });
    }

    cancel()
    {
        this.router.navigate(["meals"]);
    }

    
    validateDate()
    {
        return this.date.valid || this.date.untouched;

    }
    
    validateDescription()
    {
        return this.description.valid || this.description.untouched;

    }

    validateTime()
    {
        return this.time.valid || this.time.untouched;

    }

    validateNumberOfCalories()
    {
        return this.numberOfCalories.valid || this.numberOfCalories.untouched;
    }
}
