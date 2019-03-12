import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IMeal, IMealFilter, IDateMeal } from './meal.models';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchMealValidator } from '../validators/search-meal.validator';
import { MealService } from '../services/meal.service';
import { TOASTR_TOKEN, Toastr } from '../services/toastr.service';

@Component({
    selector: 'meal-list',
    templateUrl: './meal-list.component.html',
    styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
    meals:IMeal[]
    searched:boolean
    targetCalories:number
    searchMealsForm:FormGroup
    fromDate:FormControl
    toDate:FormControl
    fromTime:FormControl
    toTime:FormControl

    constructor(private authService:AuthService,
                private route:ActivatedRoute,
                private router:Router,
                private mealService:MealService,
                @Inject(TOASTR_TOKEN) private toastr:Toastr) {
        if(!this.authService.isAuthenticated())
        {
            this.router.navigate(["/user/login"]);
        }

        if(!this.authService.hasRegularRole())
        {
            this.router.navigate(["/home"])
        }

        this.meals = this.route.snapshot.data["meals"];
        this.targetCalories = this.authService.currentUser.caloriesTarget;
        this.searched = false;
     }

    ngOnInit(): void {
        this.fromDate = new FormControl(new Date(), []);
        this.toDate = new FormControl(new Date(), []);
        this.fromTime = new FormControl(null, []);
        this.toTime = new FormControl(null, []);
        
        this.searchMealsForm = new FormGroup({
            fromDate:this.fromDate,
            toDate:this.toDate,
            fromTime: this.fromTime,
            toTime: this.toTime
        }, SearchMealValidator.validate.bind(this));
     }

     searchMeals(filter:IMealFilter)
     {
        if(filter.fromDate != null){
            filter.fromDate = new Date(filter.fromDate.toUTCString());
        }
        if(filter.toDate != null){
            filter.toDate = new Date(filter.toDate.toUTCString());
        }
        
        this.mealService.searchMeals(filter).subscribe(res =>
        {
            res.forEach(function(meal){
                meal.dateString = new Date(meal.date).toDateString();
            });

            this.meals = res;
            this.searched = true;
        }, err => { this.toastr.error(err)})
     }

     removeMeal(mealId:string)
     {
        if(confirm("Are you sure you want to remove this meal"))
        {
            this.mealService.removeMeal(mealId).subscribe((res) =>{
                if(res.success)
                {
                    this.toastr.success(res.message);
                    this.meals = this.meals.filter(x => x.id != mealId);
                }
            });
        }
     }

     getSum(meals:Array<IMeal>)
     {
         let sum = 0;

         meals.forEach(function(meal){
             sum += meal.numberOfCalories;
         });

         return sum;
     }
}
