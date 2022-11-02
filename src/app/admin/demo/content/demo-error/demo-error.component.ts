import { Component } from '@angular/core';
import { ErrorComponent } from 'src/shared/components';
import { DemoCardProp } from 'src/shared/types/demo-card-prop';
import { DemoCardComponent } from '../../layout/demo-card/demo-card.component';
import { DemoExampleComponent } from '../../layout/demo-example/demo-example.component';

@Component({
  standalone: true,
  imports: [DemoCardComponent, DemoExampleComponent, ErrorComponent],
  selector: 'app-demo-error',
  templateUrl: './demo-error.component.html',
})
export class DemoErrorComponent {
  public inputs: DemoCardProp[] = [{ name: 'title', type: 'string' }];
}
