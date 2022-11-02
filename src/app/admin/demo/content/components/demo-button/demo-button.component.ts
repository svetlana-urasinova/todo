import { Component, OnInit } from '@angular/core';
import { ButtonComponent, ImgComponent } from 'src/shared/components';
import { NavigationService } from 'src/shared/services';
import { ButtonTypes, ComponentColors } from 'src/shared/types';
import { ImgTypes } from 'src/shared/types/components/img-types';
import { DemoCardProp } from 'src/shared/types/demo-card-prop';
import { DemoCardComponent } from '../../../layout/demo-card/demo-card.component';
import { DemoExampleComponent } from '../../../layout/demo-example/demo-example.component';

@Component({
  standalone: true,
  imports: [
    DemoCardComponent,
    DemoExampleComponent,
    ButtonComponent,
    ImgComponent,
  ],
  templateUrl: './demo-button.component.html',
  styleUrls: ['./demo-button.component.scss'],
})
export class DemoButtonComponent implements OnInit {
  public componentColors = ComponentColors;
  public buttonTypes = ButtonTypes;
  public imgTypes = ImgTypes;

  public iconBaseUrl: string;

  public inputs: DemoCardProp[] = [
    { name: 'color', type: 'ComponentColors', defaultValue: 'primary' },
    { name: 'type', type: 'ButtonTypes', defaultValue: 'button' },
    { name: 'iconUrl', type: 'string' },
    { name: 'iconType', type: 'ImgTypes', defaultValue: 'default' },
    { name: 'iconHeight', type: 'number', defaultValue: '20' },
    { name: 'iconWidth', type: 'number', defaultValue: '20' },
    { name: 'iconRight', type: 'boolean', defaultValue: 'false' },
    { name: 'noPadding', type: 'boolean', defaultValue: 'false' },
    { name: 'isDisabled', type: 'boolean', defaultValue: 'false' },
  ];

  public constructor(private readonly navigationService: NavigationService) {}

  public ngOnInit(): void {
    this.iconBaseUrl = this.navigationService.getIconBaseUrl();
  }
}
