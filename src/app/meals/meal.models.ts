import { Time } from "@angular/common";

export interface IMeal{
    dateString: string;
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

export interface IDateMeal{
    date:Date,
    meals:IMeal[]
}

export interface IResponse{
    message:string,
    success:boolean
}