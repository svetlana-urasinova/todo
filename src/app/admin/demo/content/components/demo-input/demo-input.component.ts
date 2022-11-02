import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { InputComponent } from 'src/shared/components';
import { InputTypes } from 'src/shared/types/components/input-types';
import { DemoCardProp } from 'src/shared/types/demo-card-prop';
import { DemoCardComponent } from '../../../layout/demo-card/demo-card.component';
import { DemoExampleComponent } from '../../../layout/demo-example/demo-example.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DemoCardComponent,
    DemoExampleComponent,
    InputComponent,
  ],
  selector: 'app-demo-input',
  templateUrl: './demo-input.component.html',
  styleUrls: ['./demo-input.component.scss'],
})
export class DemoInputComponent implements OnInit {
  public form: UntypedFormGroup;

  public inputTypes = InputTypes;

  public inputs: DemoCardProp[] = [
    { name: 'type', type: 'InputTypes', defaultValue: 'text' },
    { name: 'label', type: 'string' },
    { name: 'placeholder', type: 'string' },
    { name: 'pattern', type: 'string' },
    { name: 'minLength', type: 'number', defaultValue: '0' },
    { name: 'maxLength', type: 'number' },
    {
      name: 'min',
      type: 'number | null',
      defaultValue: 'null',
      description: 'Works only with type="number"',
    },
    {
      name: 'max',
      type: 'number | null',
      defaultValue: 'null',
      description: 'Works only with type="number"',
    },
    {
      name: 'step',
      type: 'number | null',
      defaultValue: 'null',
      description: 'Works only with type="number"',
    },
    { name: 'isDisabled', type: 'boolean', defaultValue: 'false' },
    { name: 'error', type: 'boolean', defaultValue: 'false' },
  ];

  public outputs: DemoCardProp[] = [
    { name: 'onFocus', type: 'void' },
    { name: 'onKeyDown', type: 'void' },
  ];

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      default: [null],
      filled_text: ['Text input'],
      filled_tel: ['8-800-555-35-35'],
      filled_number: ['80'],
      filled_email: ['test@test.com'],
      filled_password: ['Password'],
      with_label: [null],
      with_placeholder: [null],
      disabled: ['This input is disabled'],
      error: ['This input has error'],
    });
  }
}
