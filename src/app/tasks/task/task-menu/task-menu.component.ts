import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  selector: 'task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss'],
})
export class TaskMenuComponent implements OnInit, OnChanges {
  @Input() task: Task;
  @Input() result: TaskResult;
  @Input() status: TaskStatus;
  @Input() doneByUsers: User[];

  public userId: string;
  public isAdmin = false;
  public iconBaseUrl: string;
  public repeats: number;

  public taskStatus = TaskStatus;
  public taskResultDecision = TaskResultDecision;

  public constructor(
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService,
    private readonly taskService: TaskService
  ) {
    this.isAdmin = this.authService.checkIfAdmin();
    this.iconBaseUrl = this.navigationService.getIconBaseUrl();
    this.repeats = this.taskService.getHowManyTimesTaskIsDone(this.task);
  }

  public ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isAdmin = this.authService.checkIfAdmin();
    this.repeats = this.taskService.getHowManyTimesTaskIsDone(this.task);
  }

  public ngOnChanges(): void {
    this.repeats = this.taskService.getHowManyTimesTaskIsDone(this.task);
  }

  public stopPropagation($event: Event): void {
    $event?.stopPropagation();
  }

  public markAsDone(): void {
    if (
      (this.task.repeatable && this.task.maxRepeats === this.repeats) ||
      (!this.task.repeatable &&
        this.repeats > 0 &&
        this.status !== TaskStatus.Rejected)
    ) {
      return;
    }

    if (this.result) {
      const repeats =
        this.status === TaskStatus.Rejected
          ? this.result.repeats
          : this.result.repeats + 1;

      this.taskService.updateTask({
        ...this.task,
        results: this.task.results.map((result: TaskResult) =>
          result.userId === this.userId
            ? { userId: this.userId, repeats }
            : result
        ),
      });
    } else {
      this.taskService.updateTask({
        ...this.task,
        results: [...this.task.results, { userId: this.userId, repeats: 1 }],
      });
    }
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
    if (!this.result || this.result.decision === decision) {
      return;
    }

    this.taskService.updateTask({
      ...this.task,
      results: this.task.results.map((result: TaskResult) =>
        result.userId !== this.result.userId
          ? result
          : { ...result, adminId: this.userId, decision }
      ),
    });
  }
}
