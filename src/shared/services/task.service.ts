import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskResult } from '../types';
import * as uuid from 'uuid';
import { Store } from '@ngrx/store';
import {
  AddTask,
  AppState,
  DeleteTask,
  getTaskById,
  getTasks,
  UpdateTask,
} from '../store';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks$: Observable<Task[]>;

  public constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select(getTasks);
  }

  public getAllTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  public getTaskById(currentId: string): Observable<Task | null> {
    return this.store.select(getTaskById(currentId));
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

  public addTask(task: Task): void {
    const currentTask = task.id ? task : { ...task, id: uuid.v4() };
    this.store.dispatch(new AddTask(currentTask));
  }

  public updateTask(currentTask: Task): void {
    this.store.dispatch(new UpdateTask(currentTask));
  }

  public deleteTask(payload: { id: string }): void {
    this.store.dispatch(new DeleteTask(payload));
  }
}
