import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);

  private sub = new Subscription();

  usuario = this.authService.currentUser();
  isAdmin = this.authService.isAdmin();
  showLayout = true;

  ngOnInit(): void {
    this.sub.add(
      this.authService.currentUser$.subscribe(user => {
        this.usuario = user;
        this.isAdmin = this.authService.isAdmin();
      })
    );

   this.router.events.pipe(
  filter(event => event instanceof NavigationEnd)
  ).subscribe((event: any) => {
  const url = event.urlAfterRedirects;
  this.showLayout = !url.startsWith('/auth');
  });

    // primera carga
    const url = this.router.url || '';
    this.showLayout = !url.startsWith('/auth');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}