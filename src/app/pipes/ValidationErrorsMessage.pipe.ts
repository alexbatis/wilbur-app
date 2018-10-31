/*-----------------------------------IMPORTS---------------------------------*/
import { Pipe, PipeTransform } from '@angular/core';                          // Angular
import { ValidationError } from 'class-validator';                            // Class Validator

/*-----------------------------------PIPE------------------------------------*/
@Pipe({ name: 'validationErrorMessage', pure: false })
export class ValidationErrorMessagePipe implements PipeTransform {
    transform(errors: Array<ValidationError>, args: any[] = []) {
        if (!errors || !errors.length) return '';
        // return (classVariable.isArray) ? `Array<${classVariable.type}>` : classVariable.type;
        // let errorString = '';
        // errors.forEach(error => {
        //     for (const key in error)
        //         if (error.hasOwnProperty(key))
        //             errorString += `${key} -  ${error[key].toString()}\n`;
        // });
        return errors.toString();
    }
}
