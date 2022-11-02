import { Route } from '@angular/router';
import { DemoButtonComponent } from './demo-button/demo-button.component';
import { DemoCheckboxComponent } from './demo-checkbox/demo-checkbox.component';
import { DemoDateComponent } from './demo-date/demo-date.component';
import { DemoErrorComponent } from './demo-error/demo-error.component';
import { DemoImgComponent } from './demo-img/demo-img.component';
import { DemoInputComponent } from './demo-input/demo-input.component';
import { DemoLinkComponent } from './demo-link/demo-link.component';

export const DEMO_COMPONENTS_ROUTES: Route[] = [
  {
    path: 'button',
    title: 'Button',
    component: DemoButtonComponent,
  },
  {
    path: 'checkbox',
    title: 'Checkbox',
    component: DemoCheckboxComponent,
  },
  {
    path: 'link',
    component: DemoLinkComponent,
  },
  {
    path: 'date',
    component: DemoDateComponent,
  },
  {
    path: 'error',
    component: DemoErrorComponent,
  },
  {
    path: 'img',
    component: DemoImgComponent,
  },
  {
    path: 'input',
    component: DemoInputComponent,
  },
];
