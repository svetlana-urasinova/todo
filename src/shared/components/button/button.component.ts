import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentColor } from '../../types';
import { ButtonTypes } from '../../types';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'styled-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public color: ComponentColor = ComponentColor.Primary;
  @Input() public type: ButtonTypes = ButtonTypes.Button;
  @Input() public isIcon = false;
  @Input() public isDisabled = false;
}
