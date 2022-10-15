import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'styled-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() public form: FormGroup;
  @Input() public inputName: string | string[];
  @Input() public inputError: string[];
  @Input() public formError: string | string[];
  @Input() public show = true;

  public get formControl(): AbstractControl {
    return <AbstractControl>this.form.get(this.inputName);
  }

  public formSubscription: Subscription;

  public error: boolean;

  public debounceTime = 2000;

  public ngOnInit(): void {
    this.updateSubscription();
  }

  public ngOnChanges(): void {
    if (this.show) {
      this.error = this.checkErrors();
    }

    this.updateSubscription();
  }

  public ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

  private updateSubscription(): void {
    this.formSubscription?.unsubscribe();
    this.formSubscription = this.formControl?.valueChanges
      .pipe(
        tap(() => (this.error = false)),
        debounceTime(this.debounceTime)
      )
      .subscribe(() => {
        this.error = this.checkErrors();
      });
  }

  private checkErrors(): boolean {
    if (
      this.formControl.errors &&
      (this.show || this.formControl.dirty || this.formControl.touched)
    ) {
      const errors = Object.keys(this.formControl.errors);

      if (this.inputError.some((error: string) => errors.includes(error))) {
        return true;
      }
    }

    return false;
  }
}
