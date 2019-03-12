import { AbstractControl, Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

export class SearchMealValidator {
    
    static validate(formGroup: FormGroup):{ [key: string]: any; } {

        let fromDate = formGroup.controls.fromDate.value;
        let toDate = formGroup.controls.toDate.value;
        let fromTime = formGroup.controls.fromTime.value;
        let toTime = formGroup.controls.toTime.value;

        if (fromDate == null && toDate == null && fromTime == null && toTime == null) {
            return {
                canFilter: true
            };
        }

        return null;
    }
}