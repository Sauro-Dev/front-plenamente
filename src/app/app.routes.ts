import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users/users.component';

export const routes: Routes = [
  // Rutas definidas
  {
    path: 'users',
    component: UsersComponent,
    data: { breadcrumb: 'Users' },
  },
  {
    path: 'users/register',
    loadComponent: () =>
      import('./components/users/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    data: { breadcrumb: 'Registrar Usuario' }, // Breadcrumb para registro de usuario
  },
  {
    path: 'users/details/:id',  // Ruta para los detalles del usuario
    loadComponent: () =>
      import('./components/users/users-details/users-details.component').then(
        (m) => m.UsersDetailsComponent
      ),
    data: { breadcrumb: 'Detalles del Usuario' }, // Breadcrumb para detalles de usuario
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    data: { breadcrumb: 'Login' }, // Breadcrumb para login
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
    data: { breadcrumb: 'Calendar' }, // Breadcrumb para calendario
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
