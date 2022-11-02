import { Route } from '@angular/router';
import { DemoButtonComponent } from './content/demo-button/demo-button.component';
import { DemoCheckboxComponent } from './content/demo-checkbox/demo-checkbox.component';
import { DemoDateComponent } from './content/demo-date/demo-date.component';
import { DemoErrorComponent } from './content/demo-error/demo-error.component';
import { DemoImgComponent } from './content/demo-img/demo-img.component';
import { DemoInputComponent } from './content/demo-input/demo-input.component';
import { DemoLinkComponent } from './content/demo-link/demo-link.component';
import { DemoPipesComponent } from './content/demo-pipes/demo-pipes.component';
import { DemoComponent } from './demo.component';
import { DemoIndexComponent } from './content/demo-index/demo-index.component';

export const DEMO_ROUTES: Route[] = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {
        path: '',
        title: 'Demo',
        component: DemoIndexComponent,
      },
      {
        path: 'button',
        title: 'Button component',
        component: DemoButtonComponent,
      },
      {
        path: 'checkbox',
        title: 'Checkbox component',
        component: DemoCheckboxComponent,
      },
      {
        path: 'link',
        title: 'Link component',
        component: DemoLinkComponent,
      },
      {
        path: 'date',
        title: 'Date component',
        component: DemoDateComponent,
      },
      {
        path: 'error',
        title: 'Error component',
        component: DemoErrorComponent,
      },
      {
        path: 'img',
        title: 'Image component',
        component: DemoImgComponent,
      },
      {
        path: 'input',
        title: 'Input component',
        component: DemoInputComponent,
      },
      {
        path: 'pipes',
        title: 'Pipes',
        component: DemoPipesComponent,
      },
    ],
  },
];
