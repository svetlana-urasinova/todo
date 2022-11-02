import { Component, OnInit } from '@angular/core';
import { LinkComponent } from 'src/shared/components';
import { ComponentColors } from 'src/shared/types';
import { DemoCardProp } from 'src/shared/types/demo-card-prop';
import { DemoCardComponent } from '../../layout/demo-card/demo-card.component';
import { DemoExampleComponent } from '../../layout/demo-example/demo-example.component';

@Component({
  standalone: true,
  imports: [DemoCardComponent, DemoExampleComponent, LinkComponent],
  templateUrl: './demo-link.component.html',
  styleUrls: ['./demo-link.component.scss'],
})
export class DemoLinkComponent implements OnInit {
  public componentColors = ComponentColors;

  public inputs: DemoCardProp[] = [
    { name: 'href', type: 'string' },
    {
      name: 'isRouterLink',
      type: 'boolean',
      defaultValue: 'false',
      description: 'If true, component is a router link',
    },
    { name: 'isButton', type: 'boolean', defaultValue: 'false' },
    {
      name: 'buttonColor',
      type: 'ComponentColor',
      defaultValue: 'primary',
      description: 'Works only with "isButton=true"',
    },
    {
      name: 'targetBlank',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Link will be opened in new tab',
    },
    {
      name: 'noUnderline',
      type: 'boolean',
      defaultValue: 'false',
    },
    {
      name: 'onDark',
      type: 'boolean',
      defaultValue: 'false',
      description: 'If true, color will be white',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      defaultValue: 'false',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
