import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./rooms/rooms.component').then((m) => m.RoomsComponent),
  },
  {
    path: 'add-room',
    loadComponent: () =>
      import('./add-room/add-room.component').then((m) => m.AddRoomComponent),
  },
  {
    path: 'edit-room',
    loadComponent: () =>
      import('./edit-room/edit-room.component').then(
        (m) => m.EditRoomComponent
      ),
  },
] as Routes;
