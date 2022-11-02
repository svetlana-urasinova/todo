import { Route } from '@angular/router';
import { TaskEditComponent } from './edit/task-edit.component';

export const TASKS_ROUTES: Route[] = [
  {
    path: 'new',
    title: 'Новое задание',
    component: TaskEditComponent,
  },
  {
    path: 'edit/:id',
    title: 'Редактировать задание',
    component: TaskEditComponent,
  },
];
