import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'ad-demo-example',
  templateUrl: './demo-example.component.html',
  styleUrls: ['./demo-example.component.scss'],
})
export class DemoExampleComponent {
  @Input() public title: string;
}
