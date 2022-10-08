import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentColor } from '../../types';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'styled-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input() public href: string;
  @Input() public isRouterLink = false;
  @Input() public targetBlank = false;
  @Input() public text = false;
  @Input() public onDark = false;
  @Input() public clear = false;
  @Input() public isDisabled = false;
  @Input() public isButton = false;
  @Input() public color: ComponentColor = ComponentColor.Primary;

  public ngOnInit(): void {}
}
