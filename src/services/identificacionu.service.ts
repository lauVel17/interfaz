import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  consultarCiudades,
  identificacionCon,
  identificacionUs,
  identificacionUsa,
} from '../models/identificacionu';
import { environment } from '../environments/environment';
import {
  consultarDepartamento,
} from '../models/identificacionu';
import { consultarCiudad, consultarPaís } from '../models/identificacionu';
import { usuarios } from '../models/usuarios';
@Injectable({
  providedIn: 'root',
})
export class IdentificacionUService {
  constructor(private readonly http: HttpClient) {
/*     console.log('IdentificacionUService inicializado'); */
  }
  /* Consultar la identificación */
  getUsuarios(identificacion: string): Observable<identificacionUsa> {
    const url = `${environment.urlServidor}usuario/consultar-identificacion/${identificacion}`;
    return this.http.get<identificacionUsa>(url);
  }
  private identificacionSource = new BehaviorSubject<string | null>(null);
  identificacion$ = this.identificacionSource.asObservable();

  /* Almacenar la identificación enviada por el formulario usuario */
  setUsuario(identificacion: string) {
    this.identificacionSource.next(identificacion);
  }

  private nitSource = new BehaviorSubject<string | null>(null);
  nit$ = this.nitSource.asObservable();
  setnitCli(nit: string) {
    this.nitSource.next(nit);
  }
  /* Consultar pais */
  getPais(): Observable<consultarPaís[]> {
    const urlP = `${environment.urlServidor}pais/consultar-todos-paises`;
    return this.http.get<consultarPaís[]>(urlP);
  }
  /* Consultar departamento */
  getDepartamentosPorPais(): Observable<consultarDepartamento[]> {
    const idPaises = 1;
    const urlD = `${environment.urlServidor}departamento/consultar-todos-deptos/${idPaises}`;
    return this.http.get<consultarDepartamento[]>(urlD);
  }
  /* Consultar departamento por pais */
  getDepartamentoPorPais2(idPais: number): Observable<consultarDepartamento[]> {
    const url = `${environment.urlServidor}departamento/consultar-todos-deptos/${idPais}`;
    return this.http.get<consultarDepartamento[]>(url);
  }

  /* Consultar ciudad */
  getCiudadesPorDepartamento(
    idDepartamento: number
  ): Observable<consultarCiudad[]> {
    const url = `${environment.urlServidor}ciudad/consultar-todos-ciudades/${idDepartamento}`;

    return this.http.get<consultarCiudad[]>(url);
  }
  /* Consultar pais por id */
  getPaisById(idPais: number): Observable<consultarPaís> {
    const urlP = `${environment.urlServidor}pais/consultar-pais/${idPais}`;
    return this.http.get<consultarPaís>(urlP);
  }
  /* Consultar departamento por id */
  getDepartamentoById(
    idDepartamento: number
  ): Observable<consultarDepartamento> {
    const urlD = `${environment.urlServidor}departamento/consultar-departamento/${idDepartamento}`;
    return this.http.get<consultarDepartamento>(urlD);
  }
  /* Consultar ciudad por id */
  getCiudadById(idCiudad: number): Observable<consultarCiudad> {
    const urlC = `${environment.urlServidor}ciudad/consultar-ciudad/${idCiudad}`;
    return this.http.get<consultarCiudad>(urlC);
  }
  getCiudades(): Observable<consultarCiudades[]> {
    const urlD = `${environment.urlServidor}ciudad/consultar-todos-ciudades`;
    return this.http.get<consultarCiudades[]>(urlD);
  }
  getDepartamentos(): Observable<consultarDepartamento[]> {
    const urlD = `${environment.urlServidor}departamento/consultar-todos-departamento`;
    return this.http.get<consultarDepartamento[]>(urlD);
  }

  /* Consultar usuario por areaa */
  getUsuarioporArea(idArea: number): Observable<usuarios[]> {
    const urlUsuariosA = `${environment.urlServidor}usuario/usuarios/area/${idArea}`;
    return this.http.get<usuarios[]>(urlUsuariosA);
  }
  /* Consultar la identificación Contactos*/
  getContactos(identificacion: string): Observable<identificacionCon> {
    const url = `${environment.urlServidor}cliente-contacto/consultar-identificacion/${identificacion}`;
    return this.http.get<identificacionCon>(url);
  }
  private identificacionCSource = new BehaviorSubject<string | null>(null);
  identificacionC$ = this.identificacionCSource.asObservable();
  /* Almacenar la identifiación enviada por el formulario contacto */
  setContacto(identificacion: string) {
    this.identificacionCSource.next(identificacion);
  }
  getIden(identificacion: string): Observable<identificacionUs> {
    const url = `${environment.urlServidor}usuario/consultar-identificacionC/${identificacion}`;
    return this.http.get<identificacionUs>(url);
  }
}
