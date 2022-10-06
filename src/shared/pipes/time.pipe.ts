import { Pipe, PipeTransform } from '@angular/core';

const MINUTES_IN_HOUR = 60;

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / MINUTES_IN_HOUR);
    const minutes = value % MINUTES_IN_HOUR;

    return `${this.formatHours(hours)} ${this.formatMinutes(minutes)}`;
  }

  private formatHours(hours: number): string {
    const decRemainder = hours % 10;

    switch (true) {
      case !hours:
        return '';
      case hours === 1 || (hours > 20 && decRemainder === 1):
        return `${hours} час`;
      case (hours > 1 && hours < 5) ||
        (hours > 20 && decRemainder > 1 && decRemainder < 5):
        return `${hours} часа`;
      default:
        return `${hours} часов`;
    }
  }

  private formatMinutes(minutes: number): string {
    const decRemainder = minutes % 10;

    switch (true) {
      case !minutes:
        return '0 минут';
      case minutes === 1 || (minutes > 20 && decRemainder === 1):
        return `${minutes} минута`;
      case (minutes > 1 && minutes < 5) ||
        (minutes > 20 && decRemainder > 1 && decRemainder < 5):
        return `${minutes} минуты`;
      default:
        return `${minutes} минут`;
    }
  }
}
