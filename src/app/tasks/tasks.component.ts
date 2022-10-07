import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/shared/services';
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
  public tasks: Task[];

  constructor(private readonly tasksService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getAllTasks();
  }
}
