import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [

  /* =========================
   * AUTH (solo NO autenticados)
   * ========================= */
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(r => r.AUTH_ROUTES)
  },

  /* =========================
   * DASHBOARD (protegido)
   * ========================= */
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard')
        .then(c => c.DashboardComponent)
  },

  /* =========================
   * PRODUCTOS (protegido)
   * ========================= */
  {
    path: 'productos',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/productos/productos.routes')
        .then(r => r.PRODUCTOS_ROUTES)
  },

  /* =========================
   * CATEGORÍAS (solo admin)
   * ========================= */
  {
    path: 'categorias',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/categorias/pages/lista-categorias/lista-categorias.component')
        .then(c => c.ListaCategoriasComponent)
  },

  /* =========================
   * INVENTARIO (protegido)
   * ========================= */
  {
    path: 'inventario',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/inventario/inventario.routes')
        .then(r => r.INVENTARIO_ROUTES)
  },

  /* =========================
   * REPORTES (solo admin)
   * ========================= */
  {
    path: 'reportes',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/reportes/reportes.component')
        .then(c => c.ReportesComponent)
  },

  /* =========================
   * REDIRECCIONES
   * ========================= */
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];