import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DemoCardProp } from 'src/shared/types/demo-card-prop';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'ad-demo-card',
  templateUrl: './demo-card.component.html',
  styleUrls: ['./demo-card.component.scss'],
})
export class DemoCardComponent {
  @Input() public title: string;
  @Input() public inputs: DemoCardProp[] = [];
  @Input() public outputs: DemoCardProp[] = [];
}
