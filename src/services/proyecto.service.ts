import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import {
  actualizarproyecto,
  proyecto,
  proyectoCrear,
  ProyectoResponse,
} from '../models/proyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private readonly URL_PROYECTOS = `${environment.urlServidor}proyecto/consultar-todos-proyectos`;
  private URL_CREARP = `${environment.urlServidor}proyecto/crear-proyecto`;

  constructor(private readonly http: HttpClient) {}

  // Crear proyectos
  postUsuarios(
    nombre: string,
    descripcion: string,
    ciudadid: number,
    fechainicio: Date,
    fechafin: Date
  ): Observable<proyectoCrear> {
    const body = {
      nombre,
      descripcion,
      ciudadid,
      fechainicio,
      fechafin,
    };
    return this.http.post<proyectoCrear>(this.URL_CREARP, body);
  }

  getProyectos(): Observable<proyecto[]> {
    return this.http.get<proyecto[]>(this.URL_PROYECTOS);
  }
  getProyectoById(idproyecto: number): Observable<proyecto> {
    const url = `${environment.urlServidor}proyecto/consultar-proyecto/${idproyecto}`;
    return this.http.get<proyecto>(url);
  }
  putproyecto(
    idproyecto: number,
    proyecto: {
      fechainicio: Date;
      fechafin: Date;
    }
  ): Observable<actualizarproyecto> {
    const urlUpdate = `${environment.urlServidor}proyecto/actualizar-proyecto/${idproyecto}`;
    const body = {
      fechainicio: proyecto.fechainicio,
      fechafin: proyecto.fechafin,
    };
    return this.http.put<actualizarproyecto>(urlUpdate, body);
  }
  postularUsuario(nodocumento: number, proyectoid: number): Observable<any> {
    const url = `${environment.urlServidor}participaciones/postularse/${nodocumento}/${proyectoid}`;
    return this.http.post<any>(url, {});
  }
  getProyectosPorUsuario(nodocumento: number): Observable<ProyectoResponse> {
    const url = `${environment.urlServidor}participaciones/consultar-proyectos-usuarios/${nodocumento}`;
    return this.http.get<ProyectoResponse>(url);
  }

  getUsuariosPorProyecto(idproyecto: number): Observable<any> {
    const url = `${environment.urlServidor}participaciones/consultar-usuarios-proyecto/${idproyecto}`;
    return this.http.get<any>(url);
  }
}
