import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movimiento {
    id: string;
    fecha: Date;
    tipo: 'entrada' | 'salida';
    cantidad: number;
    productoId: string;
    descripcion: string;
}

@Injectable({
    providedIn: 'root'
})
export class MovimientosService {
    getHoy() {
      throw new Error('Method not implemented.');
    }
    private apiUrl = '/api/movimientos';

    constructor(private http: HttpClient) {}

    getMovimientos(): Observable<Movimiento[]> {
        return this.http.get<Movimiento[]>(this.apiUrl);
    }

    getMovimiento(id: string): Observable<Movimiento> {
        return this.http.get<Movimiento>(`${this.apiUrl}/${id}`);
    }

    crearMovimiento(movimiento: Omit<Movimiento, 'id'>): Observable<Movimiento> {
        return this.http.post<Movimiento>(this.apiUrl, movimiento);
    }

    actualizarMovimiento(id: string, movimiento: Partial<Movimiento>): Observable<Movimiento> {
        return this.http.put<Movimiento>(`${this.apiUrl}/${id}`, movimiento);
    }

    eliminarMovimiento(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}