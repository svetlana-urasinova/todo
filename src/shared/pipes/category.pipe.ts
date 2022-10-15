import { Pipe, PipeTransform } from '@angular/core';
import { categories } from '../types/l10n/ru';

@Pipe({
  standalone: true,
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    const currentCategory = categories.find(
      (category: { value: string; name: string }) => category.value === value
    );

    return currentCategory ? currentCategory.name : '';
  }
}
