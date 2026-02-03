import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CategoriaService } from '../../../../core/services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './lista-categorias.html',
  styleUrls: ['./lista-categorias.css']
})
export class ListaCategoriasComponent implements OnInit {

  private categoriaService = inject(CategoriaService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  categorias: any[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];

  ngOnInit(): void {
    this.cargarCategorias();
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

  // Placeholder claro para el siguiente paso
  crearCategoria(): void {
    // abrir dialogo
  }

  editarCategoria(categoria: any): void {
    // abrir dialogo con datos
  }

  eliminarCategoria(id: string): void {
    // confirmación + delete
  }
}