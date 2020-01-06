import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'secondToDate'
})
export class DatePipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return moment(value).format('HH:mm:ss');
  }

}
