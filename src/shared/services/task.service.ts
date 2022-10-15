import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task, TaskCategory, TaskPeriod, TaskResultDecision } from '../types';

@Injectable({ providedIn: 'root' })
export class TaskService {
  public tasksWereUpdated$: Subject<Task[]> = new Subject();

  private tasks: Task[] = [
    {
      id: '1',
      category: TaskCategory.Kitchen,
      title: 'Разобрать посудомойку',
      cost: 15,
      due_date: new Date('2022-10-05'),
      period: TaskPeriod.Day,
      results: [],
    },
    {
      id: '2',
      category: TaskCategory.Other,
      title: 'Приготовить обед',
      cost: 30,
      period: TaskPeriod.NoRepeat,
      results: [
        {
          userId: '1',
          adminId: '3',
          decision: TaskResultDecision.Rejected,
        },
      ],
    },
    {
      id: '3',
      title: 'Разобрать сушилку',
      category: TaskCategory.Laundry,
      cost: 40,
      period: TaskPeriod.Day,
      results: [],
    },
    {
      id: '4',
      title: 'Помыть свою обувь',
      desc: 'Награда указана за одну пару обуви',
      category: TaskCategory.Other,
      cost: 15,
      allowMultipleCompletitions: true,
      period: TaskPeriod.Week,
      results: [
        { userId: '1', adminId: '3', decision: TaskResultDecision.Approved },
        { userId: '2', adminId: '3', decision: TaskResultDecision.Rejected },
      ],
    },
    {
      id: '5',
      title: 'Вынести мусор',
      desc: 'Награда указана за один пакет',
      category: TaskCategory.Garbage,
      cost: 15,
      allowMultipleCompletitions: true,
      period: TaskPeriod.Day,
      results: [{ userId: '1' }],
    },
    {
      id: '6',
      title: 'Расчесать кошку',
      category: TaskCategory.Other,
      cost: 20,
      due_date: new Date('2022-10-10 14:00:00'),
      period: TaskPeriod.Week,
      results: [],
    },
    {
      id: '7',
      title: 'Пропылесосить в детской',
      category: TaskCategory.Kidsroom,
      cost: 20,
      period: TaskPeriod.Week,
      results: [
        {
          userId: '2',
        },
      ],
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

  public deleteTask(currentTask: Task): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== currentTask.id);
  }
}
