import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  public form: UntypedFormGroup;
  public isFree: UntypedFormGroup;
  public hasDueDate: UntypedFormGroup;
  public isPeriodic: UntypedFormGroup;
  public hasNoRepeatsLimit: UntypedFormGroup;

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
    });

    this.form.controls.repeatable.valueChanges.subscribe((value) => {
      this.updateRepeats(value);
    });

    this.isFree = this.formBuilder.group({
      value: [false],
    });

    this.isFree.controls.value.valueChanges.subscribe((value: boolean) => {
      this.makeTaskFree(value);
    });

    this.hasDueDate = this.formBuilder.group({
      value: [false],
    });

    this.hasDueDate.controls.value.valueChanges.subscribe((value: boolean) => {
      this.updateDueDate(value);
    });

    this.isPeriodic = this.formBuilder.group({
      value: [false],
    });

    this.isPeriodic.controls.value.valueChanges.subscribe((value: boolean) => {
      this.updatePeriod(value);
    });

    this.hasNoRepeatsLimit = this.formBuilder.group({
      value: [false],
    });

    this.hasNoRepeatsLimit.controls.value.valueChanges.subscribe(
      (value: boolean) => {
        if (value) {
          this.form.patchValue({
            maxRepeats: 0,
          });
        } else {
          this.form.patchValue({
            maxRepeats: 1,
          });
        }
      }
    );

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
          this.form.patchValue(this.currentTask);

          this.isFree.patchValue({
            value: currentTask.cost === 0,
          });

          this.hasDueDate.patchValue({
            value: !isNil(currentTask.due_date),
          });

          this.isPeriodic.patchValue({
            value: currentTask.period !== TaskPeriod.NoRepeat,
          });

          this.hasNoRepeatsLimit.patchValue({
            value: currentTask.repeatable && currentTask.maxRepeats === 0,
          });
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

    this.toggleControl(this.form.controls.period, value, validators);
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
      this.form.patchValue(this.currentTask);
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
}
