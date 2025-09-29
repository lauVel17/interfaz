import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { tokenCrear, tokens } from '../models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsTokenService {
  private readonly URL_TOKENS = `${environment.urlServidor}usToken/consultar-todos-tokens`;
  private URL_CREART = `${environment.urlServidor}usToken/guardarToken`;
  private URL_CREARTOKENNOTI = `${environment.urlServidor}token-notificaciones/guardarTokenNot`;
  constructor(private readonly http: HttpClient) {
    /*     console.log('tokenService'); */
  }
  /* Consultar tokens */
  getTokens(): Observable<tokens[]> {
    return this.http.get<tokens[]>(this.URL_TOKENS);
  }
  /* Crear tokens */
  postTokens(usuarioId: number, token: string): Observable<tokenCrear> {
    const body = {
      usuarioId,
      token,
    };
    return this.http.post<tokenCrear>(this.URL_CREART, body);
  }
  /* Crear token notificacion */

  deleteToken(token:string): Observable<tokens> {
    const urldelete = `${environment.urlServidor}usToken/eliminarToken/${token}`;
    return this.http.delete<tokens>(urldelete);
  }
  deleteTokens(usuarioId:number): Observable<tokens> {
    const urldelete = `${environment.urlServidor}usToken/eliminarTokens/${usuarioId}`;
    return this.http.get<tokens>(urldelete);
  }

}
