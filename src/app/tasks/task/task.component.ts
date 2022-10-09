import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskResult, TaskStatus, User } from 'src/shared/types';
import { ButtonComponent, ImgComponent } from 'src/shared/components';
import { TaskService, UserService } from 'src/shared/services';
import dayjs from 'dayjs';
import isEqual from 'lodash.isequal';
import sortBy from 'lodash.sortby';

import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import {
  DateOrTimePipe,
  TaskStatusPipe,
  TimePipe,
  UsernamesPipe,
} from 'src/shared/pipes';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskSidebarComponent } from './task-sidebar/task-sidebar.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TaskHeaderComponent,
    TaskSidebarComponent,
    ButtonComponent,
    ImgComponent,
    DateOrTimePipe,
    TaskStatusPipe,
    TimePipe,
    UsernamesPipe,
  ],
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() public task: Task;
  @Input() public userId: string;
  @Input() public isAdmin: boolean;

  public form: UntypedFormGroup;

  public iconBaseUrl = '/assets/img/icons/';

  public result: TaskResult | null;

  public status: TaskStatus;

  public isApproved = false;
  public isUnapproved = false;
  public isDisabled = false;
  public isOutdated = false;
  public isDone = false;
  public isReviewed = false;
  public isBlocked = false;

  public doneByUsers: User[] = [];
  public approvedFor: User[] = [];
  public rejectedFor: User[] = [];

  public taskStatus = TaskStatus;

  public showMenu = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      selected_user: [this.task.results[0]?.userId || null],
    });

    if (dayjs(this.task.due_date).isBefore(dayjs())) {
      this.isOutdated = true;
    }

    this.doneByUsers = this.task.results.map(
      (result: TaskResult) => this.userService.getUser(result.userId) as User
    );

    this.approvedFor = this.getReviewedUsers({ approved: true });
    this.rejectedFor = this.getReviewedUsers({ approved: false });

    if (this.isAdmin) {
      this.form.controls.selected_user.valueChanges.subscribe(() => {
        this.status = this.getTaskStatus();
      });

      this.isReviewed = this.isTaskReviewed();
    } else {
      this.result =
        this.task.results.find(
          (result: TaskResult) => result.userId === this.userId
        ) || null;
    }
    this.status = this.getTaskStatus();

    this.isDisabled = this.isTaskDisabled();
  }

  public markAsDone(): void {
    this.result = { userId: this.userId };

    const results = this.task.results.filter(
      (result: TaskResult) => result.userId !== this.userId
    );

    if (!this.task.allowMultipleCompletitions && results.length > 0) {
      return;
    }

    this.taskService.updateTask({
      ...this.task,
      results: [...results, this.result],
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

  public review(decision: { approved: boolean }): void {
    const currentUserId = this.form.controls.selected_user.value;

    const currentResult = this.task.results.find(
      (result: TaskResult) => result.userId === currentUserId
    );

    if (!currentResult || currentResult.approved === decision.approved) {
      return;
    }

    const results = this.task.results.filter(
      (result: TaskResult) => result.userId !== currentUserId
    );

    if (currentUserId) {
      this.taskService.updateTask({
        ...this.task,
        results: [
          ...results,
          {
            userId: currentUserId,
            adminId: this.userId,
            approved: decision.approved,
          },
        ],
      });
    }

    this.approvedFor = this.getReviewedUsers({ approved: true });
    this.rejectedFor = this.getReviewedUsers({ approved: false });

    this.flip();
  }

  public flip(): void {
    if (!this.showMenu && this.isDisabled) {
      return;
    }

    this.showMenu = !this.showMenu;
  }

  public stopPropagation($event: Event): void {
    $event?.stopPropagation();
  }

  private getReviewedUsers(decision: { approved: boolean }): User[] {
    return this.task.results
      .filter((result: TaskResult) => result.approved === decision.approved)
      .map(
        (result: TaskResult) => this.userService.getUser(result.userId) as User
      );
  }

  private isTaskDisabled(): boolean {
    if (this.isAdmin) {
      return this.task.results.length === 0;
    } else {
      return this.isOutdated || this.isBlocked || !!this.result?.approved;
    }
  }

  private isTaskReviewed(): boolean {
    return (
      this.task.results.length > 0 &&
      isEqual(
        sortBy(this.doneByUsers, ['id']),
        sortBy([...this.approvedFor, ...this.rejectedFor], 'id')
      )
    );
  }

  private getTaskStatus(): TaskStatus {
    if (this.isAdmin) {
      const currentUserId = this.form.controls.selected_user.value;
      const currentResult = this.getResultForUser(currentUserId);

      switch (true) {
        case currentResult?.approved:
          return TaskStatus.Approved;
        case currentResult?.adminId && !currentResult.approved:
          return TaskStatus.Rejected;
        case this.task.results.length > 0:
          return TaskStatus.Done;
        default:
          return TaskStatus.Default;
      }
    } else {
      switch (true) {
        case this.result?.approved:
          return TaskStatus.Approved;
        case this.result?.adminId && !this.result?.approved:
          return TaskStatus.Rejected;
        case !this.task.allowMultipleCompletitions &&
          this.doneByUsers.length > 0 &&
          this.doneByUsers[0].id !== this.userId:
          return TaskStatus.Blocked;
        case !!this.result:
          return TaskStatus.Done;
        default:
          return TaskStatus.Default;
      }
    }
  }

  private getResultForUser(userId: string): TaskResult | null {
    if (userId === null || userId === undefined) {
      return null;
    }

    return (
      this.task.results.find(
        (result: TaskResult) => result.userId === userId
      ) || null
    );
  }
}
