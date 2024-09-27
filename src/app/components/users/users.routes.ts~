import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./users/users.component').then((m) => m.UsersComponent),
    data: { breadcrumb: 'Usuarios' }
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
    data: { breadcrumb: 'Registrar Usuario' }
  },
] as Routes;
