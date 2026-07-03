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
  {
    path: 'about',
    loadComponent: () =>
      import('./presentation/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./presentation/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'stats',
    loadComponent: () =>
      import('./presentation/stats/stats.component').then((m) => m.StatsComponent),
  },
];
