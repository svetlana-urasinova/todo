import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatusValue } from '../types';

@Pipe({
  standalone: true,
  name: 'task_status',
})
export class TaskStatusPipe implements PipeTransform {
  transform(status: TaskStatusValue): string {
    switch (status) {
      case TaskStatusValue.Approved:
        return 'Принято';
      case TaskStatusValue.Rejected:
        return 'Отклонено';
      case TaskStatusValue.Blocked:
        return 'Уже сделано';
      case TaskStatusValue.Done:
        return 'На проверке';
      default:
        return '';
    }
  }
}
