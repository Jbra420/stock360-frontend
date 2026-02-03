export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: 'administrador' | 'usuario';
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  rol: 'administrador' | 'usuario';
}

export interface AuthResponse {
  data: any;
  token: string;
  usuario: Usuario;
}