import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {
  Observable,
  BehaviorSubject,
  startWith,
  combineLatest,
  forkJoin,
  map,
  switchMap,
  of,
} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorComponent } from '../app/mensajes/error/error.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { inicioS, usuarios } from '../models/usuarios';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SesionService } from './sesion.service';
import { UsuarioService } from './usuario.service';
import { AvisosComponent } from '../app/mensajes/avisos/avisos.component';
import { CreateUComponent } from '../app/page/usuarios/create/create-u.component';
@Injectable({
  providedIn: 'root',
})
export class CodigoRService {
  private usuariosSubject = new BehaviorSubject<any[]>([]);
  private usuarioSource = new BehaviorSubject<inicioS | null>(null);
  usuario$ = this.usuarioSource.asObservable();

  public usuarios$ = this.usuariosSubject.asObservable();
  constructor(
    private readonly http: HttpClient,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private sesion: SesionService,
    private usuariosService: UsuarioService
  ) {}
  /* ---------OBTENER USUARIO LOGUEADO------------- */
  obtenerUsuarioLogueado(): Observable<{
    usuario: inicioS;
    id: number;
  } | null> {
    return this.sesion.usuario$.pipe(
      map((usuario) => {
        if (usuario) {
          return { usuario, id: usuario.nodocumento };
        } else {
          return null;
        }
      })
    );
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe((usuarios) => {
      this.usuariosSubject.next(usuarios);
    });
  }

  getUsuarioName(usuarioId: number): string {
    const usuario = this.usuariosSubject
      .getValue()
      .find((usuario) => usuario.idUsuario === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido';
  }

/*   verificarCambios(originalValues: any, currentValues: any): boolean {
    if (JSON.stringify(originalValues) === JSON.stringify(currentValues)) {
      this.dialog.open(AvisosComponent, {
        width: '250px',
        data: { message: 'No se realizó ningún cambio en el formulario.' },
      });
      return false;
    }
    return true;
  } */
  /*----------------------------INACTIVAR/ACTIVAR USUARIO------------------------------ */
  cambiarEstadoU(usuario: any, origen: string): void {

    const nuevoEstado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';

    this.usuariosService
      .putEstado(usuario.nodocumento, { estado: nuevoEstado })
      .subscribe({
        next: () => {
          usuario.estado = nuevoEstado;
        },
        error: (error) => {
          const mensajeError =
            error.error?.msg ||
            'No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.';

          this.dialog.open(ErrorComponent, {
            width: '300px',
            data: { message: mensajeError },
          });
        },
      });
  }

  abrirCrearUsuario(): MatDialogRef<any> {
    return this.dialog.open(CreateUComponent, {
      width: '60vw',
      maxWidth: 'none',
      maxHeight: '100vh',
      disableClose: true,
    });
  }
}

