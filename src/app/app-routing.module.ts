import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  // {
  //   path: 'task',
  //   loadChildren: () =>
  //     import('./tasks/task-routes').then((mod) => mod.TASKS_ROUTES),
  // },
  {
    path: 'admin',
    title: 'Панель администратора',
    loadChildren: () =>
      import('./admin/admin-routes').then((mod) => mod.ADMIN_ROUTES),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
