import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { TasksService } from 'src/shared/services';
import { Task } from 'src/shared/types';

@Component({
  standalone: true,
  imports: [CommonModule, PipesModule],
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public tasks: Task[];

  public iconBaseUrl = '/assets/img/icons/';
  public defaultIcon = 'other';

  constructor(private readonly tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getAllTasks();
  }
}
