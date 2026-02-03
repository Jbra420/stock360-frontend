import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import {
  Usuario,
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from '../../shared/models/usuario.model';
import { ApiResponse } from '../../shared/models/api-responsive.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  private storage = inject(StorageService);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  isAuthenticated = signal<boolean>(false);
  currentUser = signal<Usuario | null>(null);

  constructor() {
    this.checkAuthStatus();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.api.post<ApiResponse<AuthResponse>>('auth/login', credentials).pipe(
      map(res => res.data!), // Extraemos solo `data`
      tap(authResponse => {
        if (authResponse?.token && authResponse?.usuario) {
          this.setAuthData(authResponse);
        }
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.api.post<ApiResponse<AuthResponse>>('auth/register', data).pipe(
      map(res => res.data!), 
      tap(authResponse => {
        if (authResponse?.token && authResponse?.usuario) {
          this.setAuthData(authResponse);
        }
      })
    );
  }

  logout(): void {
    this.storage.clear();
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getProfile(): Observable<Usuario> {
    return this.api.get<ApiResponse<AuthResponse>>('auth/profile').pipe(
      map(res => res.data!.usuario!)
    );
  }

  changePassword(passwords: {
    passwordActual: string;
    passwordNuevo: string;
  }): Observable<any> {
    return this.api.post('auth/change-password', passwords);
  }

  private setAuthData(authData: AuthResponse): void {
    this.storage.setToken(authData.token);
    this.storage.setUser(authData.usuario);
    this.currentUserSubject.next(authData.usuario);
    this.isAuthenticated.set(true);
    this.currentUser.set(authData.usuario);
  }

  checkAuthStatus(): void {
    const token = this.storage.getToken();
    const user = this.storage.getUser();

    if (token && user) {
      this.currentUserSubject.next(user);
      this.isAuthenticated.set(true);
      this.currentUser.set(user);
    }
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.rol === 'administrador';
  }

  getToken(): string | null {
    return this.storage.getToken();
  }
  hydrateFromStorage(): void {
  this.checkAuthStatus();
}
}
