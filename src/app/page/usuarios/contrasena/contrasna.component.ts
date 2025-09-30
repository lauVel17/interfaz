import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../../services/usuario.service';;
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../mensajes/confirm-eliminar/confirm-eliminar.component';
import { ActualizarContrasena } from '../../../../models/usuarios';
import { ExisteClienteComponent } from '../../../mensajes/existe-cliente/existe-cliente.component';
import { AvisosComponent } from '../../../mensajes/avisos/avisos.component';
import { error } from 'console';
import { ErrorComponent } from '../../../mensajes/error/error.component';
@Component({
  selector: 'app-contrasna',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contrasna.component.html',
  styleUrls: ['./contrasna.component.css'],
})
export class ContrasnaComponent implements OnInit {
  contrasenaForm: FormGroup;
  nodocumento!: number;
  contrasenaActual!: string;
  mostrarContrasena: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.contrasenaForm = this.fb.group({
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.nodocumento = +params.get('nodocumento')!;
      this.obtenerContrasenaActual();
    });
  }
  alternarMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  obtenerContrasenaActual(): void {
    this.usuarioService.getUsuarioById(this.nodocumento).subscribe({
      next: (usuario) => {
        this.contrasenaActual = usuario.contrasena;
      },
      error: (error) => {
        console.error('Error al obtener la contraseña actual:', error);
      },
    });
  }

  actualizarContrasena(nodocumento: number): void {
    const nuevaContrasena = this.contrasenaForm.get('contrasena')?.value;

    if (nuevaContrasena === this.contrasenaActual) {
      alert('La nueva contraseña no puede ser igual a la contraseña actual.');
      return;
    }

    if (this.contrasenaForm.invalid) {
      this.contrasenaForm.markAllAsTouched();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        message: '¿Estás seguro de que quieres actualizar la contraseña?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usuarioService
          .putContrasena(nodocumento, { contrasena: nuevaContrasena })
          .subscribe(
            (response: ActualizarContrasena) => {
              this.dialog
                .open(ExisteClienteComponent, {
                  width: '250px',
                  data: {
                    message:
                      response.msg || 'Contraseña actualizada exitosamente',
                  },
                })
                .afterClosed()
                .subscribe(() => {
                  location.reload();
                });
            },
            (error) => {
              console.error('Error actualizando la contraseña', error);
              this.dialog.open(AvisosComponent, {
                width: '250px',
                data: {
                  message: `La nueva contraseña no puede ser igual a la actual`,
                },
              });
            }
          );
      } /* else {
        this.dialog.open(ErrorComponent, {
          width: '250px',
          data: { message: 'La operación de actualización fue cancelada.' },
        });
      } */
    });
  }
}
