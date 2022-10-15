import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormGroup,
  FormBuilder,
  Validators,
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
      cost: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      due_date: [null, [Validators.required, isValidDate, isBeforeToday]],
      period: [TaskPeriod.NoRepeat],
      allowMultipleCompletitions: [false],
    });

    // add validators
  }

  public updateDueDate(value: boolean): void {
    this.hasDueDate = value;
    // update due date control
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
    }
  }
}
