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
    loadComponent: () =>
      import('./components/users/users/users.component').then(
        (m) => m.UsersComponent
      ),
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./components/users/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./components/calendar/calendar/calendar.component').then(
        (m) => m.CalendarComponent
      ),
  },
];
