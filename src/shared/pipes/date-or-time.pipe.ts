import { Pipe, PipeTransform } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { months } from '../types/l10n/ru';

@Pipe({
  standalone: true,
  name: 'date_or_time',
})
export class DateOrTimePipe implements PipeTransform {
  transform(date: Date): string {
    const dateObject = dayjs(date);
    if (!dateObject.isValid()) {
      return 'invalid date';
    }

    const today = dayjs();

    switch (true) {
      case dateObject.isSame(today, 'day'):
        return this.formatTime(dateObject);
      default:
        return `${this.formatDate(dateObject)}`;
    }
  }

  private formatDate(date: Dayjs): string {
    const day = date.date();
    const month = months[date.month()];
    const year = date.year();

    return `${day} ${month} ${year}`;
  }

  private formatTime(date: Dayjs): string {
    return date.format('HH:mm');
  }
}
