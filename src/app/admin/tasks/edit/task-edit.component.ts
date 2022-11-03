import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  ReactiveFormsModule,
  UntypedFormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
  ButtonComponent,
  CheckboxComponent,
  DateComponent,
  ErrorComponent,
  InputComponent,
  LinkComponent,
  ValidationMessageComponent,
} from 'src/shared/components';
import { CategoryPipe, PeriodPipe } from 'src/shared/pipes';
import { Task, TaskCategory, TaskPeriod } from 'src/shared/types';
import { isBeforeToday, isValidDate } from 'src/shared/validators';
import { isEnum } from 'src/shared/validators/enum';
import isNil from 'lodash.isnil';
import { map, mergeMap, of, take, tap } from 'rxjs';
import { TaskService } from 'src/shared/services';

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    ErrorComponent,
    InputComponent,
    LinkComponent,
    CommonModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    PeriodPipe,
    CategoryPipe,
  ],
  selector: 'task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  public component$: Subject<void> = new Subject();

  public form: UntypedFormGroup;

  public editMode = false;
  public currentTask: Task | null = null;

  public taskCategories = Object.values(TaskCategory);
  public taskPeriods = Object.keys(TaskPeriod)
    .filter((periodName: string) => periodName !== 'NoRepeat')
    .map((periodName) => TaskPeriod[periodName]);

  public error = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly taskService: TaskService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      category: [
        TaskCategory.Other,
        [Validators.required, isEnum(TaskCategory)],
      ],
      title: [null, Validators.required],
      desc: [null],
      cost: [
        null,
        [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)],
      ],
      due_date: [null],
      period: [TaskPeriod.NoRepeat],
      repeatable: [false],
      maxRepeats: [1, [Validators.pattern(/^\d+$/), Validators.min(0)]],
      is_free: [false],
      has_due_date: [false],
      is_periodic: [false],
      has_no_repeats_limit: [false],
    });

    this.form.controls.repeatable.valueChanges
      .pipe(takeUntil(this.component$))
      .subscribe((value) => {
        this.updateRepeats(value);
      });

    this.form.controls.is_free.valueChanges
      .pipe(takeUntil(this.component$))
      .subscribe((value: boolean) => {
        this.makeTaskFree(value);
      });

    this.form.controls.has_due_date.valueChanges
      .pipe(takeUntil(this.component$))
      .subscribe((value: boolean) => {
        this.updateDueDate(value);
      });

    this.form.controls.is_periodic.valueChanges
      .pipe(takeUntil(this.component$))
      .subscribe((value: boolean) => {
        this.updatePeriod(value);
      });

    this.form.controls.has_no_repeats_limit.valueChanges
      .pipe(takeUntil(this.component$))
      .subscribe((value: boolean) => {
        if (value) {
          this.form.patchValue({
            maxRepeats: 0,
          });
        } else {
          this.form.patchValue({
            maxRepeats: 1,
          });
        }
      });

    this.route.params
      .pipe(
        map((params: Params) => params.id),
        tap((id: string) => {
          this.editMode = !!id;
        }),
        mergeMap((id: string) =>
          id ? this.taskService.getTaskById(id).pipe(take(1)) : of(null)
        )
      )
      .subscribe((currentTask: Task | null) => {
        if (!this.editMode) {
          return;
        }

        if (currentTask) {
          this.currentTask = currentTask;
          this.patchFormWithTask(currentTask);
        }
      });
  }

  public makeTaskFree(value: boolean): void {
    if (value) {
      this.form.controls.cost.disable();
      this.form.controls.cost.setValue(0);
      this.form.controls.cost.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]);
    } else {
      this.form.controls.cost.enable();
      this.form.controls.cost.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(1),
      ]);
    }

    this.form.controls.cost.updateValueAndValidity();
  }

  public updateDueDate(value: boolean): void {
    const validators = [Validators.required, isValidDate, isBeforeToday];

    this.toggleControl(
      this.form.controls.due_date,
      value,
      validators,
      this.currentTask?.due_date || null
    );
  }

  public updatePeriod(value: boolean): void {
    const validators = [Validators.required, isEnum(TaskPeriod)];

    this.toggleControl(
      this.form.controls.period,
      value,
      validators,
      TaskPeriod.Day
    );
  }

  public updateRepeats(value: boolean): void {
    const validators = [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(0),
    ];

    this.toggleControl(
      this.form.controls.maxRepeats,
      value,
      validators,
      this.currentTask?.maxRepeats || 1
    );
  }

  public onSubmit(): void {
    if (this.form.valid) {
      if (this.editMode) {
        this.taskService.updateTask({
          ...this.form.value,
          id: this.currentTask?.id,
          results: [],
        });
      } else {
        this.taskService.addTask({
          ...this.form.value,
          results: [],
        });
      }
    } else {
      this.error = true;
    }
  }

  public resetError(): void {
    this.error = false;
  }

  public resetForm(): void {
    if (this.currentTask) {
      this.patchFormWithTask(this.currentTask);
    } else {
      this.form.reset();
    }
  }

  public deleteTask(): void {
    if (
      confirm(
        'Вы действительно хотите удалить это задание? Это действие необратимо.'
      )
    ) {
      if (this.currentTask?.id) {
        this.taskService.deleteTask({ id: this.currentTask.id });
      }
    }
  }

  private toggleControl(
    formControl: AbstractControl,
    show: boolean,
    validators: ValidatorFn[],
    defaultValue: string | number | Date | null = null
  ): void {
    if (show) {
      if (!isNil(defaultValue)) {
        formControl.setValue(defaultValue);
      }
      formControl.setValidators(validators);
      formControl.updateValueAndValidity({ emitEvent: false });
    } else {
      this.resetFormControl(formControl);
    }
  }

  private resetFormControl(formControl: AbstractControl): void {
    formControl.setValidators([]);
    formControl.reset(null, { emitEvent: false });
    formControl.markAsPristine();
    formControl.markAsUntouched();
  }

  private patchFormWithTask(currentTask: Task): void {
    this.form.patchValue({
      ...currentTask,
      is_free: currentTask.cost === 0,
      has_due_date: !isNil(currentTask.due_date),
      is_periodic: currentTask.period !== TaskPeriod.NoRepeat,
      has_no_repeat_limits:
        currentTask.repeatable && currentTask.maxRepeats === 0,
    });
  }
}
