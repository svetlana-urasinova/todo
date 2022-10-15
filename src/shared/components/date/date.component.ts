import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'styled-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
  ],
})
export class DateComponent implements ControlValueAccessor, OnInit {
  @Input()
  public set value(value: string) {
    this._value = value;

    this.onChange(value);
    this.onTouched();
  }

  public get value() {
    return this._value;
  }

  @Input() public label: string;
  @Input() public isDisabled = false;
  @Input() public error = false;

  public form: FormGroup;

  private _value: string;

  private component$: Subject<void> = new Subject();

  public constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      day: [null],
      month: [null],
      year: [null],
    });

    this.form.valueChanges.pipe(takeUntil(this.component$)).subscribe(() => {
      this.value = this.getValueFromForm();
    });

    if (this.isDisabled) {
      this.form.disable();
    }
  }

  public ngOnDestroy(): void {
    this.component$.next();
    this.component$.complete();
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public writeValue(value: string): void {
    this.updateValue(value);
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public validate(): ValidationErrors {
    return Object.assign(
      {},
      this.form.errors,
      this.form.controls.day.errors,
      this.form.controls.month.errors,
      this.form.controls.year.errors
    );
  }

  private getValueFromForm(): string {
    const VALID_DAY_LENGTH = 2;
    const VALID_MONTH_LENGTH = 2;

    const day = this.form.controls.day.value?.padStart(VALID_DAY_LENGTH, '0');
    const month = this.form.controls.month.value?.padStart(
      VALID_MONTH_LENGTH,
      '0'
    );
    const year = this.form.controls.year.value;

    return `${year}/${month}/${day}`;
  }

  private updateValue(value: string): void {
    const date = dayjs(value);

    if (!value || !date.isValid()) {
      this.resetValues();
      return;
    }

    const day = date.format('DD');
    const month = date.format('MM');
    const year = date.format('YYYY');

    this.form.controls.day.setValue(day);
    this.form.controls.month.setValue(month);
    this.form.controls.year.setValue(year);
  }

  private resetValues(): void {
    this.form.controls.day.setValue('');
    this.form.controls.month.setValue('');
    this.form.controls.year.setValue('');
  }

  private onChange: Function = () => {};
  private onTouched: Function = () => {};
}
