import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = false;
  hidePassword = true;

  onSubmit(): void {
    if (this.loginForm.invalid || this.loading) return;

    this.loading = true;

    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastr.success('¡Bienvenido!', 'Login exitoso');
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          this.toastr.error(error?.message || 'Error al iniciar sesión', 'Error');
        }
      });
  }
}