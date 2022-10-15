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

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'styled-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() public error = false;

  @Output() public onValueChange = new EventEmitter<boolean>();

  public form: FormGroup;

  private component$: Subject<any> = new Subject();

  public constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      value: [],
    });

    this.form.controls.value.valueChanges
      .pipe(takeUntil(this.component$))
      .subscribe((value: boolean) => {
        this.onValueChange.emit(value);
        this.onChange(value);
        this.onTouched();
      });
  }

  public ngOnDestroy(): void {
    this.component$.next(null);
    this.component$.complete();
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public writeValue(value: boolean): void {
    this.form.controls.value.setValue(value);
  }

  public validate(): ValidationErrors {
    return Object.assign({}, this.form.errors, this.form.controls.value.errors);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange: Function = () => {};
  private onTouched: Function = () => {};
}
