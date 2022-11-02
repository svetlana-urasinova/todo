import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LinkComponent } from '../link';

@Component({
  standalone: true,
  imports: [CommonModule, LinkComponent],
  selector: 'styled-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input() public title: string;
}
