import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService) as ToastrService;

  if (authService.isAdmin()) {
    return true;
  }

  toastr.error('No tienes permisos para acceder a esta sección');
  router.navigate(['/dashboard']);
  return false;
};
