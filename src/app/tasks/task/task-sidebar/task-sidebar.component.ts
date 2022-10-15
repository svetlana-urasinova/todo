import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DateOrTimePipe, TimePipe } from 'src/shared/pipes';
import { AuthService, NavigationService } from 'src/shared/services';
import { Task, TaskResult, TaskStatus } from 'src/shared/types';

@Component({
  standalone: true,
  imports: [CommonModule, TimePipe, DateOrTimePipe],
  selector: 'task-sidebar',
  templateUrl: './task-sidebar.component.html',
  styleUrls: ['./task-sidebar.component.scss'],
})
export class TaskSidebarComponent implements OnInit {
  @Input() public task: Task;
  @Input() public result: TaskResult;
  @Input() public status: TaskStatus;
  @Input() public isOutdated = false;

  public taskStatus = TaskStatus;

  public iconBaseUrl: string;

  public isAdmin = false;

  public constructor(
    private authService: AuthService,
    private readonly navigationService: NavigationService
  ) {}

  public ngOnInit(): void {
    this.iconBaseUrl = this.navigationService.getIconBaseUrl();
    this.isAdmin = this.authService.checkIfAdmin();
  }
}
