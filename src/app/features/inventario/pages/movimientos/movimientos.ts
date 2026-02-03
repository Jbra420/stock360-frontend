import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { InventarioService } from '../../../../core/services/inventario.service';
import { ProductoService } from '../../../../core/services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../../../../shared/models/producto.model';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './movimientos.html',
  styleUrls: ['./movimientos.css']
})
export class MovimientosComponent implements OnInit {

  private fb = inject(FormBuilder);
  private inventarioService = inject(InventarioService);
  private productoService = inject(ProductoService);
  private toastr = inject(ToastrService);

  movimientoForm: FormGroup;
  productos: Producto[] = [];

  constructor() {
    this.movimientoForm = this.fb.group({
      producto_id: ['', Validators.required],
      tipo_movimiento: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      motivo: [''],
      referencia: ['']
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerTodos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: () => {
        this.toastr.error('Error al cargar productos');
      }
    });
  }

  registrar(): void {
    if (this.movimientoForm.invalid) {
      this.toastr.warning('Completa los campos obligatorios');
      return;
    }

    this.inventarioService
      .registrarMovimiento(this.movimientoForm.value)
      .subscribe({
        next: () => {
          this.toastr.success('Movimiento registrado correctamente');
          this.movimientoForm.reset({
            cantidad: 1,
            tipo_movimiento: '',
            producto_id: ''
          });
        },
        error: () => {
          this.toastr.error('Error al registrar movimiento');
        }
      });
  }
}