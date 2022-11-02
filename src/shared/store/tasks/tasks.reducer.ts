import { Task, TasksState } from 'src/shared/types/tasks';
import { mockTasks } from './mockTasks';
import {
  TasksActions,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from './tasks.actions';

const initialState: TasksState = {
  tasks: mockTasks,
  currentTask: null,
};

export function tasksReducer(
  state = initialState,
  action: TasksActions
): TasksState {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task: Task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task: Task) => task.id !== action.payload.id
        ),
      };
    default:
      return { ...state };
  }
}
