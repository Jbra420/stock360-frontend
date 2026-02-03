import { Routes } from '@angular/router';

export const INVENTARIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/movimientos/movimientos')
      .then(m => m.MovimientosComponent)
  },
  {
    path: 'historial',
    loadComponent: () => import('./components/historial/historial')
      .then(m => m.HistorialComponent)
  }
];
