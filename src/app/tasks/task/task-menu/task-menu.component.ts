import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from 'src/shared/components';
import {
  AuthService,
  NavigationService,
  TaskService,
} from 'src/shared/services';
import {
  Task,
  TaskResult,
  TaskResultDecision,
  TaskStatus,
  User,
} from 'src/shared/types';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss'],
})
export class TaskMenuComponent implements OnInit {
  @Input() task: Task;
  @Input() result: TaskResult;
  @Input() status: TaskStatus;
  @Input() doneByUsers: User[];

  public userId: string;
  public isAdmin = false;
  public iconBaseUrl: string;

  public taskStatus = TaskStatus;
  public taskResultDecision = TaskResultDecision;

  public constructor(
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService,
    private readonly taskService: TaskService
  ) {
    this.isAdmin = this.authService.checkIfAdmin();
    this.iconBaseUrl = this.navigationService.getIconBaseUrl();
  }

  public ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isAdmin = this.authService.checkIfAdmin();
  }

  public stopPropagation($event: Event): void {
    $event?.stopPropagation();
  }

  public markAsDone(): void {
    const results = this.task.results.filter(
      (result: TaskResult) => result.userId !== this.userId
    );

    if (!this.task.allowMultipleCompletitions && results.length > 0) {
      return;
    }

    this.taskService.updateTask({
      ...this.task,
      results: [...results, { userId: this.userId }],
    });
  }

  public markAsNotDone(): void {
    const results = this.task.results.filter(
      (result: TaskResult) => result.userId !== this.userId
    );

    this.taskService.updateTask({
      ...this.task,
      results,
    });
  }

  public review(decision: TaskResultDecision): void {
    // const currentUserId = this.parentForm.value.selected_user;
    // const currentUserId = 'test';

    // const currentResult =
    //   this.task.results.find(
    //     (result: TaskResult) => result.userId === currentUserId
    //   ) || null;

    // if (!currentResult || currentResult.decision === decision) {
    //   return;
    // }

    if (!this.result || this.result.decision === decision) {
      return;
    }

    const results = this.task.results.filter(
      (result: TaskResult) => result.userId !== this.result.userId
    );

    this.taskService.updateTask({
      ...this.task,
      results: [
        ...results,
        {
          userId: this.result.userId,
          adminId: this.userId,
          decision,
        },
      ],
    });
  }
}
