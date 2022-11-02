import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { CheckboxComponent } from 'src/shared/components';
import { DemoCardProp } from 'src/shared/types/demo-card-prop';
import { DemoCardComponent } from '../../layout/demo-card/demo-card.component';
import { DemoExampleComponent } from '../../layout/demo-example/demo-example.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoCardComponent,
    DemoExampleComponent,
    CheckboxComponent,
  ],
  templateUrl: './demo-checkbox.component.html',
})
export class DemoCheckboxComponent implements OnInit {
  public inputs: DemoCardProp[] = [
    { name: 'error', type: 'boolean', defaultValue: 'false' },
  ];

  public outputs: DemoCardProp[] = [{ name: 'onValueChange', type: 'boolean' }];

  public form: UntypedFormGroup;

  public constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      default: [false],
      checked: [true],
      disabled: [true],
    });

    this.form.controls.disabled.disable();
  }
}
