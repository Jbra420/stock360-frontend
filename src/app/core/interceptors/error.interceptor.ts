import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject<ToastrService>(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        if (error.status === 401) {
          // No autorizado - redirigir al login
          toastr.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
          localStorage.clear();
          router.navigate(['/auth/login']);
        } else if (error.status === 403) {
          // Prohibido
          errorMessage = 'No tienes permisos para realizar esta acción';
          toastr.error(errorMessage);
        } else if (error.status === 404) {
          // No encontrado
          errorMessage = 'Recurso no encontrado';
          toastr.error(errorMessage);
        } else if (error.status === 500) {
          // Error del servidor
          errorMessage = 'Error interno del servidor';
          toastr.error(errorMessage);
        } else if (error.error && error.error.error) {
          // Error personalizado del backend
          errorMessage = error.error.error;
          toastr.error(errorMessage);
        }
      }

      console.error('Error HTTP:', error);
      return throwError(() => new Error(errorMessage));
    })
  );
};
