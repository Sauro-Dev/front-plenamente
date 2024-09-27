import { Routes } from '@angular/router';
import {UsersComponent} from "./components/users/users/users.component";

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
    data: { breadcrumb: 'Registrar Usuario' },
  },
  {
    path: 'users/details/:id',  // Ruta para los detalles del usuario
    loadComponent: () =>
      import('./components/users/users-details/users-details.component').then(
        (m) => m.UsersDetailsComponent
      ),
    data: { breadcrumb: 'Detalles del Usuario' },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    data: { breadcrumb: 'Login' },
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
    data: { breadcrumb: 'Calendar' },
  },
  {
    path: 'areas',
    loadChildren: () =>
      import('./components/areas/areas.routes').then(
        (m) => m.default // Importa todas las rutas definidas en areas.routes.ts
      ),
    data: { breadcrumb: 'Áreas' },
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
