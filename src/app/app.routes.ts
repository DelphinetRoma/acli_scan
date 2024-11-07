import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

export const appRoutes: VexRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import(
            "./pages/scan/scan.component"
          ).then((m) => m.ScanComponent),
        canActivate: [],
      },
    ]
  }
];
