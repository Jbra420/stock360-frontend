import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // ✅ fuerza lectura inmediata del storage ANTES de evaluar
  auth.checkAuthStatus();

  const token = auth.getToken();
  if (token) return true;

  router.navigate(['/auth/login']);
  return false;
};