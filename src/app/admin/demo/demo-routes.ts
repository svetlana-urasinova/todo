import { Route } from '@angular/router';
import { DemoComponent } from './demo.component';
import { DemoIndexComponent } from './layout/demo-index/demo-index.component';

export const DEMO_ROUTES: Route[] = [
  {
    path: '',
    component: DemoComponent,
    children: [
      { path: '', component: DemoIndexComponent },
      {
        path: 'components',
        loadChildren: () =>
          import('./content/components/demo-components-routes').then(
            (mod) => mod.DEMO_COMPONENTS_ROUTES
          ),
      },
    ],
  },
];
