import { Task } from 'src/shared/types';

export interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
}
