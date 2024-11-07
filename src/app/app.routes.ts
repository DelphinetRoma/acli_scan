import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

import { AuthGuard } from "./guards/auth.guard";

export const appRoutes: VexRoutes = [
  {
    path: "login",
    loadComponent: () =>
      import("./pages/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: "scan",
    loadComponent: () =>
      import(
        "./pages/scan/scan.component"
      ).then((m) => m.ScanComponent),
    canActivate: [],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import(
            "./pages/dashboard/dashboard.component"
          ).then((m) => m.DashboardComponent),
        canActivate: [AuthGuard],
      },
      {
        path: "dashboard",
        loadComponent: () =>
          import(
            "./pages/dashboard/dashboard.component"
          ).then((m) => m.DashboardComponent),
        canActivate: [AuthGuard],
      },
      {
        path: "assign-code",
        loadComponent: () =>
          import(
            "./pages/assign-code/assign-code.component"
          ).then((m) => m.AssignCodeComponent),
        canActivate: [AuthGuard],
      },
      {
        path: "send-attendees",
        loadComponent: () =>
          import(
            "./pages/send-attendees/send-attendees.component"
          ).then((m) => m.SendAttendeesComponent),
        canActivate: [AuthGuard],
      },
      // {
      //   path: "attendees",
      //   loadComponent: () =>
      //     import(
      //       "./pages/attendees/attendees.component"
      //     ).then((m) => m.AttendeesComponent),
      //   canActivate: [AuthGuard],
      // }
    ]
  }
];
