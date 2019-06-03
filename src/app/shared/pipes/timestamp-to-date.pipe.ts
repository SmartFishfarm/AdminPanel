import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.convert(value);
  }

  convert(value) {
    const dateString = moment.unix(value).format('YY-MM-DD HH:mm:ss');
    return dateString;
  }

}
