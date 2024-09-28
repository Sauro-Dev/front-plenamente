import { Routes } from '@angular/router';
import {UsersComponent} from "./components/users/users/users.component";

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
    path: 'areas',
    loadComponent: () =>
      import('./components/areas/areas/areas.component').then(
        (m) => m.AreasComponent
      ), // Esto carga el componente de áreas
    data: { breadcrumb: 'Áreas' }, // Breadcrumb para areas
  },
  {
    path: 'areas/areas-register',
    loadComponent: () =>
      import('./components/areas/areas-register/areas-register.component').then(
        (m) => m.AreasRegisterComponent
      ),
    data: { breadcrumb: 'Registrar Área' },
  },
];
