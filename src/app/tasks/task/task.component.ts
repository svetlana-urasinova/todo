import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  Task,
  TaskResult,
  TaskResultDecision,
  TaskStatus,
  User,
} from 'src/shared/types';
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
import { UsernamesPipe } from 'src/shared/pipes';
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

  public isDisabled = false;
  public isOutdated = false;
  public isReviewed = false;

  public doneByUsers: User[] = [];
  public approvedFor: User[] = [];
  public rejectedFor: User[] = [];

  public taskStatus = TaskStatus;
  public taskResultDecision = TaskResultDecision;

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

    this.doneByUsers = this.getUsersByDecision();
    this.approvedFor = this.getUsersByDecision(TaskResultDecision.Approved);
    this.rejectedFor = this.getUsersByDecision(TaskResultDecision.Rejected);

    if (this.isAdmin) {
      this.form.controls.selected_user.valueChanges.subscribe(() => {
        this.status = this.getTaskStatus();
      });

      this.isReviewed = this.isTaskReviewed();
    } else {
      this.result = this.getResultForUser(this.userId);
    }

    this.status = this.getTaskStatus();

    this.isDisabled = this.isTaskDisabled();
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
    const currentUserId = this.form.controls.selected_user.value;

    const currentResult = this.getResultForUser(currentUserId);

    if (!currentResult || currentResult.decision === decision) {
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
            decision,
          },
        ],
      });
    }

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

  private getUsersByDecision(decision?: TaskResultDecision): User[] {
    return this.task.results.reduce((users: User[], result: TaskResult) => {
      const user = this.userService.getUser(result.userId);

      if (!user) {
        return users;
      }

      switch (decision) {
        case undefined:
          return [...users, user];
        default:
          if (result.decision === decision) {
            users = [...users, user];
          }

          return users;
      }
    }, []);
  }

  private isTaskDisabled(): boolean {
    if (this.isAdmin) {
      return this.task.results.length === 0;
    } else {
      return (
        this.isOutdated ||
        this.status.value === TaskStatus.Blocked.value ||
        !!(this.result?.decision === TaskResultDecision.Approved)
      );
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
    if (this.doneByUsers.length === 0) {
      return TaskStatus.Default;
    }

    const currentResult = this.isAdmin
      ? this.getResultForUser(this.form.controls.selected_user.value)
      : this.result;

    switch (true) {
      case currentResult?.decision === TaskResultDecision.Approved:
        return TaskStatus.Approved;
      case currentResult?.decision === TaskResultDecision.Rejected:
        return TaskStatus.Rejected;
      case !this.isAdmin &&
        !this.task.allowMultipleCompletitions &&
        this.doneByUsers[0].id !== this.userId:
        return TaskStatus.Blocked;
      default:
        return TaskStatus.Done;
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
