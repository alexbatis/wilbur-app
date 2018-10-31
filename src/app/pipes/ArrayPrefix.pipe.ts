/*-----------------------------------IMPORTS---------------------------------*/
import { Pipe, PipeTransform } from '@angular/core';
import { MemberVariable } from '@app/models/Class/MemberVariable';

/*-----------------------------------PIPE------------------------------------*/
@Pipe({ name: 'arrayPrefix', pure: false })
export class ArrayPrefixPipe implements PipeTransform {
    transform(memberVariable: MemberVariable, args: any[] = []) {
        return (memberVariable.isArray) ? `Array<${memberVariable.type}>` : memberVariable.type; // Wrap in 'Array<type>'
    }
}
