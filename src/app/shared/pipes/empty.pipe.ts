import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'empty'
})
export class EmptyPipe implements PipeTransform {
    transform<T>(str: T): T {
        if (typeof(str) !== 'undefined' && str !== null && str !== "") {
            return str
        }

        return "--" as T;
    }
}
