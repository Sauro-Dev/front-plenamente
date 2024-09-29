import { Routes } from '@angular/router';

export default [
  {
    path: 'storage',
    loadComponent: () =>
      import('./storage/storage.component').then((m) => m.StorageComponent),
  },
  {
    path: 'storage/material-register',
    loadComponent: () =>
      import('./material-register/material-register.component').then((m) => m.MaterialRegisterComponent),
  },
  {
    path: 'storage/material-edit',
    loadComponent: () =>
      import('./material-edit/material-edit.component').then((m) => m.MaterialEditComponent),
  },

] as Routes;
