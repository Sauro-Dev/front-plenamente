import { Routes } from '@angular/router';
import {UsersComponent} from "./components/users/users/users.component";

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/register',
    loadComponent: () =>
      import('./components/users/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'users/details/:id',
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
      ),
  },
  {
    path: 'areas/areas-register',
    loadComponent: () =>
      import('./components/areas/areas-register/areas-register.component').then(
        (m) => m.AreasRegisterComponent
      ),
  },
  {
    path: 'rooms',
    loadComponent: () =>
      import('./components/rooms/rooms/rooms.component').then(
        (m) => m.RoomsComponent
      ),
  },
  {
    path: 'storage',
    loadComponent: () =>
      import('./components/storage/storage/storage.component').then(
        (m) => m.StorageComponent
      ),
  },
  {
    path: 'storage/material-register',
    loadComponent: () =>
      import('./components/storage/material-register/material-register.component').then(
        (m) => m.MaterialRegisterComponent
      ),
  },
];
