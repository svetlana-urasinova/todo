import { Injectable } from '@angular/core';
import { Task, TaskCaterogy, TaskPeriod } from '../types';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [
    {
      id: '1',
      category: TaskCaterogy.Kitchen,
      title: 'Разобрать посудомойку',
      cost: 15,
      due_date: new Date('2022-10-05'),
      isPeriodic: true,
      period: TaskPeriod.Day,
    },
    {
      id: '2',
      category: TaskCaterogy.Kitchen,
      title: 'Приготовить обед',
      cost: 30,
      due_date: new Date('2022-10-07 14:00:00'),
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
      desc: 'Стоимость указана за одну пару обуви',
      cost: 15,
      isPeriodic: true,
      period: TaskPeriod.Week,
      done: ['1', '2'],
      approved: ['1'],
    },
    {
      id: '5',
      title: 'Вынести мусор',
      desc: 'Стоимость указана за один пакет',
      cost: 15,
      isPeriodic: true,
      period: TaskPeriod.Day,
      done: ['1'],
    },
    {
      id: '6',
      title: 'Расчесать кошку',
      cost: 20,
      due_date: new Date('2022-10-10 14:00:00'),
      isPeriodic: true,
      period: TaskPeriod.Week,
    },
  ];

  public getAllTasks(): Task[] {
    return this.tasks;
  }
}
