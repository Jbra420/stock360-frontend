export interface ApiResponse<T = any> {
  usuario: any;
  length: number;
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: Date;
}

export interface PaginationParams {
  pagina?: number;
  limite?: number;
}

export interface PaginatedResponse<T> {
  datos: T[];
  total: number;
  pagina: number;
  limite: number;
  total_paginas: number;
}