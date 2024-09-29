import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

export default [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./users-details/users-details.component').then((m) => m.UsersDetailsComponent),
      },
    ],
  },
] as Routes;
