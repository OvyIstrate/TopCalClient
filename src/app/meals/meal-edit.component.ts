import { Component, OnInit, Inject } from '@angular/core';
import { IMeal } from './meal.models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MealService } from '../services/meal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../services/toastr.service';

@Component({
    selector: 'meal-edit',
    templateUrl: './meal-edit.component.html',
    styleUrls: ['./meal-edit.component.css']
})
export class MealDetailsComponent implements OnInit {
    meal:IMeal
    editMealForm:FormGroup
    date:FormControl
    description:FormControl
    time:FormControl
    numberOfCalories:FormControl
    
    constructor(private authService:AuthService,
                private mealService:MealService,
                private router:Router,
                private route:ActivatedRoute,
                @Inject(TOASTR_TOKEN) private toastr:Toastr) {
                    
        if(!authService.isAuthenticated())
        {
            router.navigate(["/home"]);
        }
        if(!authService.hasRegularRole())
        {
            router.navigate(["/users"]);
        }

        this.meal = route.snapshot.data["meal"];
     }

    ngOnInit(): void {
        this.date = new FormControl(new Date(this.meal.date), [Validators.required])
        this.description = new FormControl(this.meal.description, [Validators.required])
        this.time = new FormControl(this.meal.time, [Validators.required])
        this.numberOfCalories = new FormControl(this.meal.numberOfCalories, [Validators.required, Validators.max(4000)])
        
        this.editMealForm = new FormGroup({
            date:this.date,
            description:this.description,
            time:this.time,
            numberOfCalories:this.numberOfCalories
        })
     }

    updateMeal(meal:IMeal)
    {
        meal.id = this.meal.id;
        this.mealService.updateMeal(meal).subscribe(res =>{
            if(res.success){
                this.toastr.success(res.message);
                this.router.navigate(["/meals"])
            }
            else {
                this.toastr.error("An error has occured when updating a meal!")
            }
        });
    }

    cancel(){
        this.router.navigate(["meals"]);
    }

    
    validateDate() {
        return this.date.valid || this.date.untouched;

    }
    
    validateDescription() {
        return this.description.valid || this.description.untouched;

    }

    validateTime() {
        return this.time.valid || this.time.untouched;

    }

    validateNumberOfCalories() {
        return this.numberOfCalories.valid || this.numberOfCalories.untouched;
    }
}
