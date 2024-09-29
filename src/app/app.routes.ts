import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/users/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/users/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import(
            './components/users/users-details/users-details.component'
          ).then((m) => m.UsersDetailsComponent),
        data: { breadcrumb: 'Detalles del Usuario' },
      },
    ],
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
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/areas/areas/areas.component').then(
            (m) => m.AreasComponent
          ),
      },
      {
        path: 'areas-register',
        loadComponent: () =>
          import(
            './components/areas/areas-register/areas-register.component'
          ).then((m) => m.AreasRegisterComponent),
      },
    ],
  },
  {
    path: 'rooms',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/rooms/rooms/rooms.component').then(
            (m) => m.RoomsComponent
          ),
      },
      {
        path: 'add-room',
        loadComponent: () =>
          import('./components/rooms/add-room/add-room.component').then(
            (m) => m.AddRoomComponent
          ),
      },
      {
        path: 'edit-room',
        loadComponent: () =>
          import('./components/rooms/edit-room/edit-room.component').then(
            (m) => m.EditRoomComponent
          ),
      },
    ],
  },
  {
    path: 'storage',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/storage/storage/storage.component').then(
            (m) => m.StorageComponent
          ),
      },
      {
        path: 'material-register',
        loadComponent: () =>
          import(
            './components/storage/material-register/material-register.component'
          ).then((m) => m.MaterialRegisterComponent),
      },
    ],
  },
];
