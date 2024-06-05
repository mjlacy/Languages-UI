import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'parseArray'
})
export class ParseArrayPipe implements PipeTransform {
    transform<T>(array: T[]): T {
        return array.toString().replace(/,/g,", ") as T;
    }
}
