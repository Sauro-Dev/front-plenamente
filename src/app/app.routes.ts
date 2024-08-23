import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./components/users/users.rutes'),

  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./components/calendar/calendar/calendar.component').then(
        (m) => m.CalendarComponent
      ),
  },
];
