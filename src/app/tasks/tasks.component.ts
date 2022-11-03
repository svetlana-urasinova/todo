import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, TaskService } from 'src/shared/services';
import { Task } from 'src/shared/types';
import { TaskComponent } from './task/task.component';

@Component({
  standalone: true,
  imports: [CommonModule, TaskComponent],
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public tasks: Observable<Task[]>;

  public userId: string;
  public isAdmin = false;

  constructor(
    private readonly authService: AuthService,
    private readonly taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getAllTasks();

    this.userId = this.authService.getUserId();
    this.isAdmin = this.authService.checkIfAdmin();
  }
}
