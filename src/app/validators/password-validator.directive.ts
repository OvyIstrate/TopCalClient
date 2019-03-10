import { AbstractControl, Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

export class PasswordValidator {
    
    static validate(formGroup: FormGroup):{ [key: string]: any; } {

        let password = formGroup.controls.password.value;
        let confirm = formGroup.controls.confirm.value;

        if (confirm == null || confirm.length <= 0) {
            return null;
        }

        if (confirm != null && password != null && confirm !== password) {
            return {
                doesMatchPassword: true
            };
        }

        return null;
    }
}