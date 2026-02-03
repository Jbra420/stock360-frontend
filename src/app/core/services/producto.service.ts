import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ApiResponse } from '../../shared/models/api-responsive.model';
import {
  Producto,
  ProductoCreate,
  ProductoUpdate,
  ProductoStockBajo
} from '../../shared/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api = inject(ApiService);

  obtenerTodos(): Observable<Producto[]> {
    return this.api.get<Producto[]>('productos').pipe(
      map(res => res.data ?? [])
    );
  }

  obtenerPorId(id: string): Observable<Producto> {
    return this.api.get<Producto>(`productos/${id}`).pipe(
      map(res => res.data!)
    );
  }

  crear(data: ProductoCreate): Observable<Producto> {
    // La API normalmente devuelve ApiResponse<T>. Unwrap de data para que el componente reciba Producto.
    return this.api.post<ApiResponse<Producto>>('productos', data).pipe(
      map(res => res.data!)
    );
  }

  actualizar(id: string, data: ProductoUpdate): Observable<Producto> {
    return this.api.put<Producto>(`productos/${id}`, data).pipe(
      map(res => res.data!)
    );
  }

  eliminar(id: string): Observable<boolean> {
    return this.api.delete<boolean>(`productos/${id}`).pipe(
      map(res => (res.data ?? true))
    );
  }

  buscar(termino: string): Observable<Producto[]> {
    return this.api.get<Producto[]>('productos/buscar', { termino }).pipe(
      map(res => res.data ?? [])
    );
  }

  obtenerStockBajo(): Observable<ProductoStockBajo[]> {
    return this.api.get<ProductoStockBajo[]>('productos/stock-bajo').pipe(
      map(res => res.data ?? [])
    );
  }
}