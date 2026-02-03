import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);

  // 1) Primary source (your app's storage service)
  let token = storage.getToken?.() ?? null;

  // 2) Fallback (prevents blank token on first app load)
  //    NOTE: adjust keys here if your project uses different ones.
  if (!token) {
    token =
      localStorage.getItem('access_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('jwt') ||
      null;
  }

  // If request already has Authorization header, don't overwrite it
  if (token && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};