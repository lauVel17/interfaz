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
    private router: Router,
    public dialog: MatDialog,
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
   /*  if (this.usuarioForm.valid) {
      const { usuario, contrasena } = this.usuarioForm.value;

      this.sesion.postPeticiones(usuario, contrasena).subscribe(
        (response: inicioS) => {
          if (response.token) {
            if (response.estado === 'Activo') {
              this.sesion.setToken(response.token);

              localStorage.setItem('estadoUsuario', response.estado);
              this.notificacion
                .registrarTokenNotificacion()
                .then(() => {})
                .catch((error) => {
                  console.error('Error en registro de notificación:', error);
                  this.router.navigate(['/principal/menuPrincipal']);
                });

              this.registrarToken(response.idUsuario, response.token);

              this.inactividadUsuario.iniciarDeteccion();
              this.router.navigate(['/principal/menuPrincipal']);
            } else {
              this.dialog.open(ErrorComponent, {
                width: '250px',
                data: {
                  message:
                    'Su cuenta está inactiva. Contacte con un administrador.',
                },
              });
            }
          }
        },
        (error) => {
          const mensajeError =
            error.error?.msg ||
            'No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.';

          this.dialog.open(ErrorComponent, {
            width: '300px',
            data: { message: mensajeError },
          });
        }
      );
    } */
  }

  registrarToken(usuarioId: number, token: string): void {
 /*    this.usTokenService.postTokens(usuarioId, token).subscribe(
      (response: tokenCrear) => {},
      (error: HttpErrorResponse) => {
        console.error('Error al registrar el token:', error);
      }
    ); */
  }

  openRecuperarContrasenaDialog() {
  /*   const dialogRef = this.dialog.open(RecConDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {}); */
  }
}
