import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'create-meal',
    templateUrl: './create-meal.component.html',
    // styleUrls: ['./name.component.scss']
})
export class CreateMealComponent implements OnInit {
    isDirty: any;
    
    constructor() { }

    ngOnInit(): void { }
}
