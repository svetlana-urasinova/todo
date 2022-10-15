import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task, TasksState } from 'src/shared/types';

export const getTasksState = createFeatureSelector<TasksState>('tasks');

export const getTasks = createSelector(
  getTasksState,
  (state: TasksState): Task[] => state.tasks
);

export const getCurrentTask = createSelector(
  getTasksState,
  (state: TasksState): Task | null => state.currentTask
);

export const getIngredientById = (id: string) =>
  createSelector(
    getTasks,
    (tasks: Task[]): Task | null =>
      tasks.find((task: Task) => task.id === id) || null
  );
