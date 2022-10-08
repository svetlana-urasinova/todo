import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentColor } from '../../types';
import { ButtonTypes } from '../../types';
import { ImgComponent } from '../img';

@Component({
  standalone: true,
  imports: [CommonModule, ImgComponent],
  selector: 'styled-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public color: ComponentColor = ComponentColor.Primary;
  @Input() public type: ButtonTypes = ButtonTypes.Button;
  @Input() public icon: string;
  @Input() public iconHeight = 20;
  @Input() public iconWidth = 20;
  @Input() public noPadding = false;
  @Input() public isDisabled = false;
}
