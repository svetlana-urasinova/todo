import { Pipe, PipeTransform } from '@angular/core';
import { periods } from '../types/l10n/ru';

@Pipe({
  standalone: true,
  name: 'period',
})
export class PeriodPipe implements PipeTransform {
  transform(value: string): string {
    const currentPeriod = periods.find(
      (period: { value: string; name: string }) => period.value === value
    );

    return currentPeriod ? currentPeriod.name : '';
  }
}
