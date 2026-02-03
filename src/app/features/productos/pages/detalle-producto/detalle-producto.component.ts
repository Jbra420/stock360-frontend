import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { ProductoService } from '../../../../core/services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './detalle-producto.html',
  styleUrls: ['./detalle-producto.css']
})
export class DetalleProductoComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);

  producto: any = null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.cargarProducto(params['id']);
      }
    });
  }

  cargarProducto(id: string): void {
    this.productoService.obtenerPorId(id).subscribe({
      next: (response) => {
        if (response?.success && response.data) {
          this.producto = response.data;
        }
      }
    });
  }
}