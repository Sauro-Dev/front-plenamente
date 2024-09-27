import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users/users.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { breadcrumb: 'Usuarios' },
  },
  {
    path: 'users/register',
    loadComponent: () =>
      import('./components/users/register/register.component').then(
        (m) => m.RegisterComponent
      ),
      data: { breadcrumb: 'Registrar Usuario' },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
      data: { breadcrumb: 'Inicio de Sesión' },
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./components/calendar/calendar/calendar.component').then(
        (m) => m.CalendarComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
