import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../types/app-state';
import * as fromTasks from './tasks';

export const appReducer: ActionReducerMap<AppState, any> = {
  tasks: fromTasks.tasksReducer,
};
