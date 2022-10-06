import { Injectable } from '@angular/core';
import { Task, TaskCaterogy, TaskPeriod } from '../types';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      category: TaskCaterogy.Kitchen,
      title: 'Разобрать посудомойку',
      cost: 15,
      isPeriodic: true,
      period: TaskPeriod.Day,
    },
    {
      id: '2',
      category: TaskCaterogy.Kitchen,
      title: 'Приготовить обед',
      cost: 30,
      isPeriodic: true,
      period: TaskPeriod.Day,
    },
    {
      id: '3',
      title: 'Разобрать сушилку',
      category: TaskCaterogy.Laundry,
      cost: 40,
      isPeriodic: true,
      period: TaskPeriod.Day,
    },
    {
      id: '4',
      title: 'Помыть свою обувь',
      cost: 15,
      isPeriodic: true,
      period: TaskPeriod.Week,
    },
    {
      id: '5',
      title: 'Расчесать кошку',
      cost: 20,
      isPeriodic: true,
      period: TaskPeriod.Week,
    },
  ];

  public getAllTasks(): Task[] {
    return this.tasks;
  }
}
