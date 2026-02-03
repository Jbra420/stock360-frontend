export type TipoMovimiento = 'entrada' | 'salida' | 'ajuste';

export interface MovimientoInventario {
  id: string;
  producto_id: string;
  tipo_movimiento: TipoMovimiento;
  cantidad: number;
  stock_anterior: number;
  stock_nuevo: number;
  motivo?: string;
  referencia?: string;
  usuario_id?: string;
  created_at: Date;
}

export interface MovimientoCreate {
  producto_id: string;
  tipo_movimiento: TipoMovimiento;
  cantidad: number;
  motivo?: string;
  referencia?: string;
}

export interface MovimientoConDetalles extends MovimientoInventario {
  producto_nombre: string;
  producto_codigo: string;
  usuario_nombre?: string;
  categoria_nombre?: string;
}

export interface FiltrosMovimiento {
  producto_id?: string;
  tipo_movimiento?: TipoMovimiento;
  fecha_desde?: Date;
  fecha_hasta?: Date;
  usuario_id?: string;
  limite?: number;
}


