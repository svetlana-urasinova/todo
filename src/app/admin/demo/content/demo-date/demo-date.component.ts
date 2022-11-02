import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { DateComponent } from 'src/shared/components';
import { DemoCardProp } from 'src/shared/types/demo-card-prop';
import { DemoCardComponent } from '../../layout/demo-card/demo-card.component';
import { DemoExampleComponent } from '../../layout/demo-example/demo-example.component';

@Component({
  standalone: true,
  imports: [
    DemoCardComponent,
    DemoExampleComponent,
    DateComponent,
    ReactiveFormsModule,
  ],
  selector: 'app-demo-date',
  templateUrl: './demo-date.component.html',
})
export class DemoDateComponent implements OnInit {
  public form: UntypedFormGroup;

  public inputs: DemoCardProp[] = [
    { name: 'label', type: 'string' },
    { name: 'isDisabled', type: 'boolean', defaultValue: 'false' },
    { name: 'error', type: 'boolean', defaultValue: 'false' },
  ];

  public constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      default: [null],
      filled: ['2022-02-22'],
      disabled: ['2000-01-01'],
      error: ['1900-12-31'],
    });

    this.form.controls.disabled.disable();
  }
}
