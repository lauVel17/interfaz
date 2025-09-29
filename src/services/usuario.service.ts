import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';;
import {
  ActualizarContrasena,
  ActualizarEstado,
  actualizarUsuario,
  usuarioCrear,
  UsuarioEstado,
  usuarios,
  usuariosEliminar,
  inicioS
} from '../models/usuarios';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly URL_USUARIOS = `${environment.urlServidor}usuario/consultar-todos-usuarios`;
  private URL_CREARU = `${environment.urlServidor}usuario/crear-usuario`;
  private readonly URL_USUARIOSACTIVOS = `${environment.urlServidor}usuario/consultar-usuarios-activos`;
  private usuariosSource = new BehaviorSubject<usuarios[] | null>(null);
  usuarios$ = this.usuariosSource.asObservable();


  constructor(private readonly http: HttpClient) {}

  // Crear usuarios
  postUsuarios(
    nodocumento: string,
    nombreapellido: string,
    correo: string,
    telefono: string,
    fechaingreso: Date,
    ciudadId: number,
    estado: string
  ): Observable<usuarioCrear> {
    const body = {
      nodocumento,
      nombreapellido,
      correo,
      telefono,
      fechaingreso,
      ciudadId,
      estado,
    };
    return this.http.post<usuarioCrear>(this.URL_CREARU, body);
  }
  /* Usuarios activos */
  getUsuariosActivos() {
    return this.http.get<usuarios[]>(this.URL_USUARIOSACTIVOS);
  }
  // Consultar todos los usuarios
  getUsuarios(): Observable<usuarios[]> {
    return this.http.get<usuarios[]>(this.URL_USUARIOS);
  }
  // Consultar usuarios 20 recientes
  getUsuariosRec(): Observable<usuarios[]> {
    const url = `${environment.urlServidor}usuario/consultar-todos-usuarios`;
    return this.http.get<usuarios[]>(url);
  }
  // Almacenar todos los datos del usuario
  setUsuarios(usuarios: usuarios[]): void {
    this.usuariosSource.next(usuarios);
  }

  // Consultar usuario por ID
  getUsuarioById(nodocumento: number): Observable<usuarios> {
    const url = `${environment.urlServidor}usuario/consultar-usuario/${nodocumento}`;
    return this.http.get<usuarios>(url);
  }

  // Actualizar usuario
  putUsuarios(
    idUsuario: number,
    usuario: {
      nombre: string;
      apellido: string;
      correo: string;
      telefono: string;
      areaId: number;
      fechaNacimiento: Date;
      ciudadId: number;
    }
  ): Observable<actualizarUsuario> {
    const urlUpdate = `${environment.urlServidor}usuario/actualizar-usuario/${idUsuario}`;
    const body = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      telefono: usuario.telefono,
      areaId: usuario.areaId,
      fechaNacimiento: usuario.fechaNacimiento,
      ciudadId: usuario.ciudadId,
    };
    return this.http.put<actualizarUsuario>(urlUpdate, body);
  }

  // Actualizar contraseña
  putContrasena(
    idUsuario: number,
    usuario: {
      contrasena: string;
    }
  ): Observable<ActualizarContrasena> {
    const urlUpdate = `${environment.urlServidor}usuario/actualizar-contrasena/${idUsuario}`;
    const body = {
      contrasena: usuario.contrasena,
    };
    return this.http.put<ActualizarContrasena>(urlUpdate, body);
  }
  /* Actualizar estado */

  putEstado(
    idUsuario: number,
    usuario: {
      estado: string;
    }
  ): Observable<ActualizarEstado> {
    const urlUpdate = `${environment.urlServidor}usuario/actualizar-estado/${idUsuario}`;
    const body = {
      estado: usuario.estado,
    };

    return this.http.put<ActualizarEstado>(urlUpdate, body);
  }

  // Eliminar usuario
  deleteUsuarios(idUsuario: number): Observable<usuariosEliminar> {
    const urlDelete = `${environment.urlServidor}usuario/eliminar-usuario/${idUsuario}`;
    return this.http.delete<usuariosEliminar>(urlDelete);
  }
  /* Consultar estado del usuario */
  getEstadoU(idUsuario: number): Observable<UsuarioEstado> {
    const headers = new HttpHeaders().set('X-No-Spinner', 'true');
    const url = `${environment.urlServidor}usuario/consultar-estado/${idUsuario}`;
    return this.http.get<UsuarioEstado>(url, { headers });
  }
}
