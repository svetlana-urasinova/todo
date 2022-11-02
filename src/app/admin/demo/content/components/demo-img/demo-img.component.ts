import { Component, OnInit } from '@angular/core';
import { ImgComponent } from 'src/shared/components';
import { DemoCardProp } from 'src/shared/types/demo-card-prop';
import { DemoCardComponent } from '../../../layout/demo-card/demo-card.component';
import { DemoExampleComponent } from '../../../layout/demo-example/demo-example.component';

@Component({
  standalone: true,
  imports: [DemoCardComponent, DemoExampleComponent, ImgComponent],
  selector: 'app-demo-img',
  templateUrl: './demo-img.component.html',
  styleUrls: ['./demo-img.component.scss'],
})
export class DemoImgComponent implements OnInit {
  public inputs: DemoCardProp[] = [
    { name: 'src', type: 'string' },
    { name: 'type', type: 'ImgTypes', defaultValue: 'default' },
    { name: 'alt', type: 'string' },
    { name: 'height', type: 'number' },
    { name: 'width', type: 'number' },
    {
      name: 'stretch',
      type: 'boolean',
      defaultValue: 'false',
      description: 'When true, image will stretch to container',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
