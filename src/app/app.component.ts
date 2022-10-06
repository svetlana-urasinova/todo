import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  standalone: true,
  imports: [RouterModule, TasksComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';
}
