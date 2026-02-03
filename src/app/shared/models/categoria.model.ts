export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
}

export interface CategoriaCreate {
  nombre: string;
  descripcion?: string;
}

export interface CategoriaUpdate {
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
}

export interface ResumenCategoria extends Categoria {
  total_productos: number;
  stock_total: number;
  productos_stock_bajo: number;
}