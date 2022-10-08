import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { Task, TaskResult, User } from 'src/shared/types';
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

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PipesModule,
    ButtonComponent,
    ImgComponent,
    ReactiveFormsModule,
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
  public defaultIcon = 'other';

  public result: TaskResult | null;

  public isApproved = false;
  public isDisabled = false;
  public isOutdated = false;
  public isDone = false;
  public isReviewed = false;

  public doneByUsers: User[] = [];
  public approvedFor: User[] = [];
  public rejectedFor: User[] = [];

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
      this.isDone = this.isTaskDone();
      this.isReviewed = this.isTaskReviewed();
      this.isApproved = this.isTaskApproved();

      this.form.controls.selected_user.valueChanges.subscribe(() => {
        this.isApproved = this.isTaskApproved();
      });
    } else {
      this.result =
        this.task.results.find(
          (result: TaskResult) => result.userId === this.userId
        ) || null;

      this.isDone = this.isTaskDone();
      this.isApproved = this.isTaskApproved();
    }

    this.isDisabled = this.isTaskDisabled();
  }

  public markAsDone(): void {
    this.result = { userId: this.userId };

    const results = this.task.results.filter(
      (result: TaskResult) => result.userId !== this.userId
    );

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
    if (this.isApproved === decision.approved) {
      return;
    }

    const currentUserId = this.form.controls.selected_user.value;

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

  private isTaskApproved(): boolean {
    if (this.isAdmin) {
      const currentUserId = this.form.controls.selected_user.value;

      if (!currentUserId) {
        return false;
      }

      const currentResult = this.task.results.find(
        (result: TaskResult) => result.userId === currentUserId
      );

      return !!currentResult?.approved;
    } else {
      return !!this.result?.approved;
    }
  }

  private isTaskDisabled(): boolean {
    if (this.isAdmin) {
      return this.task.results.length === 0;
    } else {
      return this.isOutdated || !!this.result?.approved;
    }
  }

  private isTaskDone(): boolean {
    if (this.isAdmin) {
      return this.task.results.length > 0;
    } else {
      return !!this.result;
    }
  }

  private isTaskReviewed(): boolean {
    return (
      this.isDone &&
      isEqual(
        sortBy(this.doneByUsers),
        sortBy([...this.approvedFor, ...this.rejectedFor])
      )
    );
  }
}
