import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IMeal, IMealFilter } from './meal.models';

@Component({
    selector: 'meal-list',
    templateUrl: './meal-list.component.html',
    styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
    filter:IMealFilter;
    meals:IMeal[]
    constructor(private authService:AuthService,private route:ActivatedRoute, private router:Router) {
        
        if(!this.authService.isAuthenticated())
        {
            this.router.navigate(["/user/login"]);
        }

        if(!this.authService.hasRegularRole())
        {
            this.router.navigate(["/home"])
        }

        this.meals = this.route.snapshot.data["meals"];
        this.filter = {
            fromDate:null,
            toDate:null,
            fromTime:null,
            toTime: null
        };
     }

    ngOnInit(): void {
        console.log(this.filter);
     }
}
