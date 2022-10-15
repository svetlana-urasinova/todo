import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
import { InputTypes } from 'src/shared/types/components/input-types';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'styled-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public type: InputTypes = InputTypes.Text;
  @Input() public label: string;
  @Input() public placeholder = '';
  @Input() public pattern: string;
  @Input() public minLength = 0;
  @Input() public maxLength: number;
  @Input() public isDisabled = false;
  @Input() public error = false;

  @Output() public onKeyDown: EventEmitter<boolean> = new EventEmitter();

  public form: FormGroup;

  @Input()
  public set value(value: string | number) {
    this._value = value;

    this.onChange(value);
    this.onTouched();
  }

  public get value(): string | number {
    return this._value;
  }

  private _value: string | number;

  private component$: Subject<any> = new Subject();

  public constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({ value: [] });

    this.form.controls.value.valueChanges
      .pipe(takeUntil(this.component$))
      .subscribe((value: string | number) => {
        this.error = false;
        this.value = this.type === InputTypes.Number ? Number(value) : value;
      });

    if (this.isDisabled) {
      this.form.disable();
    }
  }

  public ngOnDestroy(): void {
    this.component$.next(null);
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
    this.form.controls.value.setValue(value);
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public validate(): ValidationErrors {
    return Object.assign({}, this.form.errors, this.form.controls.value.errors);
  }

  private onChange: Function = () => {};
  private onTouched: Function = () => {};
}
