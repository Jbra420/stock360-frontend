import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ApiResponse } from '../../shared/models/api-responsive.model';
import { Categoria, CategoriaCreate } from '../../shared/models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private api = inject(ApiService);

  crear(data: CategoriaCreate): Observable<Categoria> {
    return this.api
      .post<ApiResponse<Categoria>>('categorias', data)
      .pipe(map(res => res.data!));
  }

  obtenerTodas(): Observable<Categoria[]> {
    return this.api
      .get<Categoria[]>('categorias')
      .pipe(map(res => res.data ?? []));
  }
}