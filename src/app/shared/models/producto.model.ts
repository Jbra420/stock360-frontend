export interface Producto {
  data: any;
  success: any;
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  categoria_id?: string;
  categoria_nombre?: string;
  talla?: string;
  color?: string;
  precio_compra?: number;
  precio_venta?: number;
  stock_actual: number;
  stock_minimo: number;
  rfid_tag?: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
}

export interface ProductoCreate {
  codigo: string;
  nombre: string;
  descripcion?: string;
  categoria_id?: string;
  talla?: string;
  color?: string;
  precio_compra?: number;
  precio_venta?: number;
  stock_inicial?: number;
  stock_minimo?: number;
  rfid_tag?: string;
}

export interface ProductoUpdate {
  nombre?: string;
  descripcion?: string;
  categoria_id?: string;
  talla?: string;
  color?: string;
  precio_compra?: number;
  precio_venta?: number;
  stock_minimo?: number;
  rfid_tag?: string;
  activo?: boolean;
}

export interface ProductoStockBajo {
  id: string;
  codigo: string;
  nombre: string;
  talla?: string;
  color?: string;
  stock_actual: number;
  stock_minimo: number;
  categoria?: string;
}