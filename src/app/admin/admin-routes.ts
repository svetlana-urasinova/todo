import { Route } from '@angular/router';

export const ADMIN_ROUTES: Route[] = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks-routes').then((mod) => mod.TASKS_ROUTES),
  },
  {
    path: 'demo',
    loadChildren: () =>
      import('./demo/demo-routes').then((mod) => mod.DEMO_ROUTES),
  },
];
