import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', title: 'Задания', component: TasksComponent },
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
