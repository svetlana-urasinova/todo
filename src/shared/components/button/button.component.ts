import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ImgTypes } from 'src/shared/types/components/img-types';
import { ComponentColors } from '../../types';
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
  @Input() public color: ComponentColors = ComponentColors.Primary;
  @Input() public type: ButtonTypes = ButtonTypes.Button;
  @Input() public iconUrl: string;
  @Input() public iconColor: string;
  @Input() public iconType: ImgTypes = ImgTypes.Default;
  @Input() public iconHeight = 20;
  @Input() public iconWidth = 20;
  @Input() public iconRight = false;
  @Input() public noPadding = false;
  @Input() public isDisabled = false;
}
