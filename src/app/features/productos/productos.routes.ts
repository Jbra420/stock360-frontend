import { Routes } from '@angular/router';

export const PRODUCTOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/lista-productos/lista-productos.component')
      .then(m => m.ListaProductosComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./components/form-producto/form-producto.component')
      .then(m => m.FormProductoComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/detalle-producto/detalle-producto.component')
      .then(m => m.DetalleProductoComponent)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./components/form-producto/form-producto.component')
      .then(m => m.FormProductoComponent)
  }
];