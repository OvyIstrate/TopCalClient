import { Component, OnInit, Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from './services/toastr.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    images:string[]
    constructor() {

     }


    ngOnInit(): void { }
}
