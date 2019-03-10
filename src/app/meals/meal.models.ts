import { Time } from "@angular/common";

export interface IMeal{
    id:string,
    description:string,
    numberOfCalories:number,
    date:Date,
    time:Time
}

export interface IMealFilter{
    fromDate:Date,
    toDate:Date,
    fromTime:Time,
    toTime:Time
}