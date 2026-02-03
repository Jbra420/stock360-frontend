import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ApiResponse } from '../../shared/models/api-responsive.model';
import {
  MovimientoInventario,
  MovimientoCreate,
  MovimientoConDetalles,
  FiltrosMovimiento
} from '../../shared/models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private api = inject(ApiService);

  registrarMovimiento(data: MovimientoCreate): Observable<MovimientoInventario> {
    // La API normalmente responde ApiResponse<T>, por eso se hace unwrap de data
    return this.api
      .post<ApiResponse<MovimientoInventario>>('inventario/movimiento', data)
      .pipe(map(res => res.data!));
  }

  obtenerHistorial(filtros?: FiltrosMovimiento): Observable<MovimientoConDetalles[]> {
    return this.api
      .get<MovimientoConDetalles[]>('inventario/historial', filtros)
      .pipe(map(res => res.data ?? []));
  }

  obtenerEstadisticas(): Observable<any> {
    return this.api
      .get<any>('inventario/estadisticas')
      .pipe(map(res => res.data));
  }
}