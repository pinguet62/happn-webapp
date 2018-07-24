import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'parseIsoDate'})
export class ParseIsoDatePipe implements PipeTransform {

  transform(value: string): Date {
    return new Date(value);
  }

}
