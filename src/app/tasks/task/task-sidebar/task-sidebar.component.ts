import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DateOrTimePipe, TaskStatusPipe, TimePipe } from 'src/shared/pipes';
import { AuthService, NavigationService } from 'src/shared/services';
import { Task, TaskStatusValue } from 'src/shared/types';

@Component({
  standalone: true,
  imports: [CommonModule, TimePipe, DateOrTimePipe, TaskStatusPipe],
  selector: 'app-task-sidebar',
  templateUrl: './task-sidebar.component.html',
  styleUrls: ['./task-sidebar.component.scss'],
})
export class TaskSidebarComponent implements OnInit {
  @Input() public task: Task;
  @Input() public status: TaskStatusValue;

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

  // private getTaskStatus(): TaskStatus {
  //   if (this.isAdmin) {
  //     return { value: TaskStatusValue.Default };
  //   }

  //   switch (true) {
  //     case this.isApproved:
  //       return { value: TaskStatusValue.Approved, icon: 'check' };
  //     case this.result?.adminId && !this.isApproved:
  //       return { value: TaskStatusValue.Rejected, icon: 'cross' };
  //     case this.isBlocked:
  //       return { value: TaskStatusValue.Blocked, icon: 'not-allowed' };
  //     case this.isDone:
  //       return { value: TaskStatusValue.Done, icon: 'hourglass' };
  //     default:
  //       return { value: TaskStatusValue.Default };
  //   }
  // }
}
