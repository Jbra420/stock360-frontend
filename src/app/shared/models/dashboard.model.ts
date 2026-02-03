export interface DashboardStats {
  total_productos: number;
  total_categorias: number;
  productos_stock_bajo: number;
  valor_total_inventario: number;
  movimientos_hoy: number;
  movimientos_semana: number;
}

export interface MovimientosRecientes {
  entradas: number;
  salidas: number;
  ajustes: number;
  fecha: string;
}

export interface TopProductos {
  nombre: string;
  codigo: string;
  cantidad: number;
}