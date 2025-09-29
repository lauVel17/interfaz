import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { inicioS, tokenCrear } from '../../../models/usuarios';
import { ErrorComponent } from '../../mensajes/error/error.component';
import { SesionService } from '../../../services/sesion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { UsTokenService } from '../../../services/usToken.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuarioForm: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sesion: SesionService,
    private router: Router,
    private usuarioService: UsuarioService,
    private usTokenService: UsTokenService,
    public dialog: MatDialog
  ) {
    this.usuarioForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  alternarMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
  inicio(): void {
    if (!this.usuarioForm.valid) return;

    const { usuario, contrasena } = this.usuarioForm.value;

    this.sesion.postPeticiones(usuario, contrasena).subscribe({
      next: (response: inicioS) => {
        if (!response.token) {
          this.mostrarError('No se recibió un token válido.');
          return;
        }

        if (response.estado !== 'Activo') {
          this.mostrarError(
            'Su cuenta está inactiva. Contacte con un administrador.'
          );
          return;
        }

        this.sesion.setToken(response.token);
        localStorage.setItem('estadoUsuario', response.estado);
       this.registrarToken(response.nodocumento, response.token); 
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        const mensajeError =
          error.error?.msg ||
          'No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.';
        this.mostrarError(mensajeError);
      },
    });
  }

  private mostrarError(mensaje: string): void {
    this.dialog.open(ErrorComponent, {
      width: '300px',
      data: { message: mensaje },
    });
  }

  registrarToken(usuarioId: number, token: string): void {
    this.usTokenService.postTokens(usuarioId, token).subscribe(
      (response: tokenCrear) => {},
      (error: HttpErrorResponse) => {
        console.error('Error al registrar el token:', error);
      }
    );
  }

  /*   openRecuperarContrasenaDialog() {
    const dialogRef = this.dialog.open(RecConDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  } */
}
