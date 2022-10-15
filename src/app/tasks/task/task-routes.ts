import { Route } from '@angular/router';
import { TaskEditComponent } from './edit/task-edit.component';

export const TASK_ROUTES: Route[] = [
  { path: 'new', component: TaskEditComponent },
  { path: 'edit/:id', component: TaskEditComponent },
];
