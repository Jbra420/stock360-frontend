import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../core/services/auth.service'; 

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

import { ProductoService } from '../../../../core/services/producto.service';
import { InventarioService } from '../../../../core/services/inventario.service';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { ProductoStockBajo } from '../../../../shared/models/producto.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  private productoService = inject(ProductoService);
  private inventarioService = inject(InventarioService);
  private categoriaService = inject(CategoriaService);
  private authService = inject(AuthService);

  loading = true;

  totalProductos = 0;
  totalCategorias = 0;
  productosStockBajo = 0;
  movimientosRecientes = 0;

  stockBajo: ProductoStockBajo[] = [];
  displayedColumns = ['nombre', 'categoria', 'stock', 'acciones'];

  // ===== DONUT =====
  doughnutChartType: ChartType = 'doughnut';

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Stock bajo', 'Stock OK'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#f44336', '#7cffc4'],
        borderWidth: 0
      }
    ]
  };

  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#eaeaf0' }
      }
    }
  };

  ngOnInit(): void {
  // ✅ asegura auth listo en el primer render
  if (!this.authService.getToken()) {
    this.authService.checkAuthStatus();
  }

  if (this.authService.getToken()) {
    this.cargarDashboard();
  } else {
    // si no hay sesión, no te quedes pegado cargando
    this.loading = false;
  }
}

cargarDashboard(): void {
  this.loading = true;

  forkJoin({
    productos: this.productoService.obtenerTodos()
      .pipe(catchError(() => of([]))),

    categorias: this.categoriaService.obtenerTodas()
      .pipe(catchError(() => of([]))),

    stockBajo: this.productoService.obtenerStockBajo()
      .pipe(catchError(() => of([] as ProductoStockBajo[]))),

    movimientos: this.inventarioService.obtenerHistorial({ limite: 10 })
      .pipe(catchError(() => of([])))
  })
  .pipe(
    finalize(() => (this.loading = false)) // ✅ SIEMPRE APAGA EL LOADING
  )
  .subscribe(({ productos, categorias, stockBajo, movimientos }) => {

    this.totalProductos = productos.length;
    this.totalCategorias = categorias.length;

    this.stockBajo = stockBajo.slice(0, 5);
    this.productosStockBajo = stockBajo.length;

    this.movimientosRecientes = movimientos.length;

    const ok = Math.max(this.totalProductos - this.productosStockBajo, 0);
    this.doughnutChartData.datasets[0].data = [this.productosStockBajo, ok];
  });
}

  verDetallesProducto(id: number): void {
    // Lógica para navegar a la página de detalles del producto
    // Por ejemplo, usando el Router de Angular
    // this.router.navigate(['/productos', id]);
  }
}
