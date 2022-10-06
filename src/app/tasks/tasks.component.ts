import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/shared/services';
import { Task } from 'src/shared/types';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public tasks: Task[];

  constructor(private readonly tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getAllTasks();
  }
}
