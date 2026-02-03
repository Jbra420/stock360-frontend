import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';

import { ProductoService } from '../../../../core/services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../../../../shared/models/producto.model';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule
  ],
  templateUrl: './lista-productos.html',
  styleUrls: ['./lista-productos.css']
})
export class ListaProductosComponent implements OnInit {
  private productoService = inject(ProductoService);
  private toastr = inject(ToastrService);

  productos: Producto[] = [];
  displayedColumns = ['codigo', 'nombre', 'categoria', 'stock', 'precio', 'acciones'];
  searchTerm = '';

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerTodos().subscribe({
      next: productos => {
        this.productos = productos;
      },
      error: () => {
        this.toastr.error('Error al cargar productos');
      }
    });
  }

  buscar(): void {
    if (!this.searchTerm.trim()) {
      this.cargarProductos();
      return;
    }

    this.productoService.buscar(this.searchTerm).subscribe({
      next: productos => {
        this.productos = productos;
      },
      error: () => {
        this.toastr.error('Error en la búsqueda');
      }
    });
  }

  eliminar(id: string): void {
    if (!confirm('¿Eliminar este producto?')) return;

    this.productoService.eliminar(id).subscribe({
      next: () => {
        this.toastr.success('Producto eliminado');
        this.cargarProductos();
      },
      error: () => {
        this.toastr.error('Error al eliminar producto');
      }
    });
  }
}