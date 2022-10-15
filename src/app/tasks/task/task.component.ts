import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {
  Task,
  TaskResult,
  TaskResultDecision,
  TaskStatus,
  User,
} from 'src/shared/types';
import { ButtonComponent } from 'src/shared/components';
import { UserService } from 'src/shared/services';
import dayjs from 'dayjs';
import isEqual from 'lodash.isequal';
import sortBy from 'lodash.sortby';

import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskSidebarComponent } from './task-sidebar/task-sidebar.component';
import { TaskResultsComponent } from './task-results/task-results.component';
import { TaskMenuComponent } from './task-menu/task-menu.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TaskHeaderComponent,
    TaskSidebarComponent,
    TaskResultsComponent,
    TaskMenuComponent,
    ButtonComponent,
  ],
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnChanges {
  @ViewChild(TaskMenuComponent) taskMenuComponent: TaskMenuComponent;

  @Input() public task: Task;
  @Input() public userId: string;
  @Input() public isAdmin: boolean;

  public form: UntypedFormGroup;

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
    private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    if (dayjs(this.task.due_date).isBefore(dayjs())) {
      this.isOutdated = true;
    }

    this.doneByUsers = this.getUsersByDecision();
    this.approvedFor = this.getUsersByDecision(TaskResultDecision.Approved);
    this.rejectedFor = this.getUsersByDecision(TaskResultDecision.Rejected);

    this.form = this.formBuilder.group({
      selected_user: new FormControl(this.doneByUsers[0]?.id || null),
    });

    if (this.isAdmin) {
      this.result = this.getResultForUser(this.form.value.selected_user);

      this.form.controls.selected_user.valueChanges.subscribe(
        (userId: string) => {
          this.result = this.getResultForUser(userId);
          this.status = this.getTaskStatus();
        }
      );

      this.isReviewed = this.isTaskReviewed();
    } else {
      this.result = this.getResultForUser(this.userId);
    }

    this.status = this.getTaskStatus();
    this.isDisabled = this.isTaskDisabled();
  }

  public ngOnChanges(): void {
    this.status = this.getTaskStatus();
    this.isDisabled = this.isTaskDisabled();
  }

  public flip(): void {
    if (!this.showMenu && this.isDisabled) {
      return;
    }

    this.showMenu = !this.showMenu;
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

    switch (true) {
      case this.result?.decision === TaskResultDecision.Approved:
        return TaskStatus.Approved;
      case this.result?.decision === TaskResultDecision.Rejected:
        return TaskStatus.Rejected;
      case !this.isAdmin &&
        !this.task.maxRepeats &&
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
