import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { ProductoService } from '../../../../core/services/producto.service';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './form-producto.html',
  styleUrls: ['./form-producto.css']
})
export class FormProductoComponent implements OnInit {

  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  productoForm: FormGroup;
  categorias: any[] = [];

  isEditing = false;
  productoId: string | null = null;

  constructor() {
    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      categoria_id: [null],
      talla: [''],
      color: [''],
      precio_compra: [0],
      precio_venta: [0],
      stock_inicial: [0],
      stock_minimo: [5],
      rfid_tag: ['']
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.productoId = params['id'];
        if (this.productoId) {
          this.cargarProducto(this.productoId);
        }
      }
    });
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerTodas().subscribe({
  next: (categorias) => {
    this.categorias = categorias;
  },
  error: (err) => {
    console.error(err);
  }
});
  }

  cargarProducto(id: string): void {
    this.productoService.obtenerPorId(id).subscribe({
      next: (response) => {
        if (response?.success && response.data) {
          this.productoForm.patchValue(response.data);
        }
      }
    });
  }

guardar(): void {
  if (this.productoForm.invalid) return;

  const accion$ = this.isEditing && this.productoId
    ? this.productoService.actualizar(this.productoId, this.productoForm.value)
    : this.productoService.crear(this.productoForm.value);

  accion$.subscribe({
    next: () => {
      this.toastr.success(
        `Producto ${this.isEditing ? 'actualizado' : 'creado'} correctamente`
      );
      this.router.navigate(['/productos']);
    },
    error: () => {
      this.toastr.error('Error al guardar producto');
    }
  });
}
}