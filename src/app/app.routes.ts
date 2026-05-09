import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'repeated',
    loadComponent: () =>
      import('./presentation/repeated/repeated.component').then((m) => m.RepeatedComponent),
  },
  {
    path: 'export',
    loadComponent: () =>
      import('./presentation/export/export.component').then((m) => m.ExportComponent),
  },
];
