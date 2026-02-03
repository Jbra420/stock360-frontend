import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private TOKEN_KEY = 'token';
  private USER_KEY = 'usuario';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setUser(user: Usuario): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): Usuario | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
  hasSession(): boolean {
  return !!localStorage.getItem(this.TOKEN_KEY);
}
}
