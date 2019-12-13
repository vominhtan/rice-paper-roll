import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    return DateTime.fromISO(value).toLocaleString(DateTime.DATE_HUGE);
  }
}
