import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { InventarioService } from '../../../../core/services/inventario.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class HistorialComponent implements OnInit {

  private inventarioService = inject(InventarioService);

  movimientos: any[] = [];
  columns = ['fecha', 'producto', 'tipo', 'cantidad'];

 ngOnInit(): void {
  this.inventarioService.obtenerHistorial().subscribe({
    next: movimientos => {
      this.movimientos = movimientos;
    },
    error: () => {
      console.error('Error al cargar historial');
    }
  });
}
}