import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentColors } from 'src/shared/types';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'styled-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input() public href: string;
  @Input() public color: ComponentColors = ComponentColors.Primary;
  @Input() public isRouterLink = false;
  @Input() public targetBlank = false;
  @Input() public onDark = false;
  @Input() public noUnderline = false;
  @Input() public isDisabled = false;
  @Input() public isButton = false;

  public ngOnInit(): void {}
}
