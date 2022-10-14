import { Action } from '@ngrx/store';
import { Task } from 'src/shared/types';

export const ADD_TASK = '[Tasks] Add task';
export const UPDATE_TASK = '[Tasks] Update task';
export const DELETE_TASK = '[Tasks] Delete task';

export class AddTask implements Action {
  readonly type = ADD_TASK;

  constructor(public payload: Task) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;

  constructor(public payload: Task) {}
}

export class DeleteTask implements Action {
  readonly type = DELETE_TASK;

  constructor(public payload: Task) {}
}

export type TasksActions = AddTask | UpdateTask | DeleteTask;
