import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  ButtonComponent,
  CheckboxComponent,
  DateComponent,
  InputComponent,
  ValidationMessageComponent,
} from 'src/shared/components';
import { CategoryPipe, PeriodPipe } from 'src/shared/pipes';
import { TaskCategory, TaskPeriod } from 'src/shared/types';
import { isBeforeToday, isValidDate } from 'src/shared/validators';

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    CheckboxComponent,
    DateComponent,
    InputComponent,
    PeriodPipe,
    CategoryPipe,
  ],
  selector: 'task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  public editMode = false;
  public form: UntypedFormGroup;

  public taskCategories = Object.values(TaskCategory);
  public taskPeriods = Object.values(TaskPeriod);

  public hasDueDate = false;
  public isPeriodic = false;

  public error = false;

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      category: [TaskCategory.Other, Validators.required],
      title: [null, Validators.required],
      desc: [null],
      cost: [
        null,
        [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)],
      ],
      due_date: [null],
      period: [TaskPeriod.NoRepeat],
      allowMultipleCompletitions: [false],
    });

    this.form.valueChanges.subscribe(() => {
      this.error = false;
    });

    // add validators
  }

  public updateDueDate(value: boolean): void {
    this.hasDueDate = value;

    if (value) {
      this.form.controls.due_date.setValidators([
        Validators.required,
        isValidDate,
        isBeforeToday,
      ]);
      this.form.controls.due_date.updateValueAndValidity({ emitEvent: false });
    } else {
      this.resetFormControl(this.form.controls.due_date);
    }
  }

  public updatePeriod(value: boolean): void {
    this.isPeriodic = value;
    //update period control
  }

  public onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.error = true;
      console.log(
        Object.keys(this.form.controls).filter(
          (key: string) => this.form.get(key)?.status !== 'VALID'
        )
      );
    }
  }

  public resetError(): void {
    this.error = false;
  }

  public resetFormControl(formControl: AbstractControl): void {
    formControl.setValidators([]);
    formControl.reset(null, { emitEvent: false });
    formControl.markAsPristine();
    formControl.markAsUntouched();
  }
}
