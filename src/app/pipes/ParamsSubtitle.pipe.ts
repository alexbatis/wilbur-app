/*-----------------------------------IMPORTS---------------------------------*/
import { Pipe, PipeTransform } from '@angular/core';

/*-----------------------------------PIPE------------------------------------*/
@Pipe({ name: 'paramsSubtitle', pure: false })
export class ParamsSubtitlePipe implements PipeTransform {
    transform(params: Array<any>, args: any[] = []) {
        if (!params || !params.length) return '()';                             // Return '()' if no params present
        let paramsString = '';
        params.forEach(param => {
            paramsString += ` ${param.name} : ${param.value}, `;                // Create comma seperated list of params
        });
        paramsString = paramsString.substring(1, paramsString.lastIndexOf(',')); // Remove last comma
        paramsString = `(${paramsString})`;                                      // Wrap in parenthesis
        return paramsString;
    }
}
