import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task, TaskCaterogy, TaskPeriod } from '../types';

@Injectable({ providedIn: 'root' })
export class TaskService {
  public tasksWereUpdated$: Subject<Task[]> = new Subject();

  private tasks: Task[] = [
    {
      id: '1',
      category: TaskCaterogy.Kitchen,
      title: 'Разобрать посудомойку',
      cost: 15,
      due_date: new Date('2022-10-05'),
      period: TaskPeriod.Day,
      results: [],
    },
    {
      id: '2',
      category: TaskCaterogy.Kitchen,
      title: 'Приготовить обед',
      cost: 30,
      results: [
        {
          userId: '1',
          adminId: '3',
          approved: false,
        },
      ],
    },
    {
      id: '3',
      title: 'Разобрать сушилку',
      category: TaskCaterogy.Laundry,
      cost: 40,
      period: TaskPeriod.Day,
      results: [],
    },
    {
      id: '4',
      title: 'Помыть свою обувь',
      desc: 'Награда указана за одну пару обуви',
      cost: 15,
      period: TaskPeriod.Week,
      results: [
        { userId: '1', adminId: '3', approved: true },
        { userId: '2', adminId: '3', approved: false },
      ],
    },
    {
      id: '5',
      title: 'Вынести мусор',
      desc: 'Награда указана за один пакет',
      category: TaskCaterogy.Garbage,
      cost: 15,
      period: TaskPeriod.Day,
      results: [{ userId: '1' }],
    },
    {
      id: '6',
      title: 'Расчесать кошку',
      cost: 20,
      due_date: new Date('2022-10-10 14:00:00'),
      period: TaskPeriod.Week,
      results: [],
    },
  ];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public saveTask(currentTask: Task): void {
    this.tasks = [...this.tasks, currentTask];

    this.tasksWereUpdated$.next([...this.tasks]);
  }

  public updateTask(currentTask: Task): void {
    this.tasks = this.tasks.map((task: Task) => {
      return task.id !== currentTask.id ? task : currentTask;
    });

    this.tasksWereUpdated$.next([...this.tasks]);
  }
}
