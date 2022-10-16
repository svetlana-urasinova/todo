import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  Task,
  TaskCategory,
  TaskPeriod,
  TaskResult,
  TaskResultDecision,
} from '../types';
import * as uuid from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskService {
  public tasksWereUpdated$: Subject<Task[]> = new Subject();

  private tasks: Task[] = [
    {
      id: '1',
      category: TaskCategory.Kitchen,
      title: 'Разобрать посудомойку',
      cost: 15,
      repeatable: false,
      due_date: new Date('2022-10-05'),
      period: TaskPeriod.Day,
      results: [],
    },
    {
      id: '2',
      category: TaskCategory.Other,
      title: 'Приготовить обед',
      cost: 30,
      repeatable: false,
      period: TaskPeriod.NoRepeat,
      results: [
        {
          userId: '1',
          adminId: '3',
          decision: TaskResultDecision.Rejected,
          repeats: 1,
        },
      ],
    },
    {
      id: '3',
      category: TaskCategory.Laundry,
      title: 'Разобрать сушилку',
      cost: 40,
      repeatable: false,
      period: TaskPeriod.Day,
      results: [],
    },
    {
      id: '4',
      category: TaskCategory.Other,
      title: 'Помыть свою обувь',
      desc: 'Награда указана за одну пару обуви',
      cost: 15,
      repeatable: true,
      maxRepeats: 0,
      period: TaskPeriod.Week,
      results: [
        {
          userId: '1',
          adminId: '3',
          decision: TaskResultDecision.Approved,
          repeats: 1,
        },
        {
          userId: '2',
          adminId: '3',
          decision: TaskResultDecision.Rejected,
          repeats: 2,
        },
      ],
    },
    {
      id: '5',
      category: TaskCategory.Garbage,
      title: 'Вынести мусор',
      desc: 'Награда указана за один пакет',
      due_date: new Date('2023-02-04'),
      cost: 15,
      repeatable: true,
      maxRepeats: 3,
      period: TaskPeriod.Day,
      results: [
        {
          userId: '1',
          repeats: 2,
        },
      ],
    },
    {
      id: '6',
      category: TaskCategory.Other,
      title: 'Расчесать кошку',
      cost: 20,
      repeatable: false,
      due_date: new Date('2023-10-10 14:00:00'),
      period: TaskPeriod.Week,
      results: [],
    },
    {
      id: '7',
      category: TaskCategory.Kidsroom,
      title: 'Пропылесосить в детской',
      cost: 20,
      repeatable: false,
      period: TaskPeriod.Week,
      results: [
        {
          userId: '2',
          repeats: 1,
        },
      ],
    },
  ];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(currentId: string): Task | null {
    return this.tasks.find((task: Task) => task.id === currentId) || null;
  }

  public getHowManyTimesTaskIsDone(currentTask: Task): number {
    if (!currentTask?.results) {
      return 0;
    }

    return currentTask.results.reduce(
      (times: number, result: TaskResult) => times + result.repeats,
      0
    );
  }

  public saveTask(task: Task): void {
    const currentTask = task.id ? task : { ...task, id: uuid.v4() };
    this.tasks = [...this.tasks, currentTask];

    this.tasksWereUpdated$.next([...this.tasks]);

    console.log(this.tasks);
  }

  public updateTask(currentTask: Task): void {
    this.tasks = this.tasks.map((task: Task) => {
      return task.id !== currentTask.id ? task : currentTask;
    });

    this.tasksWereUpdated$.next([...this.tasks]);

    console.log(this.tasks);
  }

  public deleteTask(currentId: string): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== currentId);

    console.log(this.tasks);
  }
}
