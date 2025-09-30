import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inicioS } from '../models/usuarios';
import { environment } from '../environments/environment';
import { UsTokenService } from './usToken.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private URL_INICIO = `${environment.urlServidor}usuario/iniciar-sesion`;

  private tokenSource = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSource.asObservable();

  private usuarioSource = new BehaviorSubject<inicioS | null>(null);
  public usuario$ = this.usuarioSource.asObservable();

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private rendererFactory: RendererFactory2,
    private usToken: UsTokenService,
    public dialog: MatDialog
  ) {
    this.cargarSesionDesdeStorage();
  }

  postPeticiones(usuario: string, contrasena: string): Observable<inicioS> {
    return this.http
      .post<inicioS>(this.URL_INICIO, { nodocumento: usuario, contrasena })
      .pipe(
        tap((response: inicioS) => {
          if (response.token) {
            this.guardarSesion(response);
          }
        })
      );
  }

  cargarSesionDesdeStorage(): void {
    if (!this.usuarioSource.value) {
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        this.usuarioSource.next(JSON.parse(storedUser));
      }
    }
  }

  guardarSesion(usuario: inicioS): void {
    if (
      !this.usuarioSource.value ||
      this.usuarioSource.value.nodocumento !== usuario.nodocumento
    ) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('authToken', usuario.token!);
      localStorage.setItem('estadoUsuario', usuario.estado);

      this.usuarioSource.next(usuario);
    }
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Verificar si el token ha expirado
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del JWT
      const exp = payload.exp * 1000; // Convierte a milisegundos
      return Date.now() > exp;
    } catch (e) {
      return true;
    }
  }

  // Guardar el token en localStorage
  setToken(token: string): void {
    this.tokenSource.next(token);
    localStorage.setItem('authToken', token);
  }

  // Cerrar sesión (limpia localStorage)
  logout(): void {
    const token = localStorage.getItem('authToken');

    if (token) {
      this.dialog.closeAll();
      forkJoin([this.usToken.deleteToken(token!)]).subscribe({
        next: () => {
          this.cerrarSesion();
        },
        error: (err) => {
          console.error('Error al eliminar los tokens:', err);
          this.cerrarSesion();
        },
      });
    } else {
      console.warn('No se encontró un token para eliminar.');
      this.cerrarSesion();
    }
    localStorage.clear();
  }
  cerrarSesion(): void {
    this.usuarioSource.next(null);
    this.tokenSource.next(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

/* Guardar token */

/*   private iniciarTemporizadorInactividad(): void {
    if (this.tiempoInactividad) {
      clearTimeout(this.tiempoInactividad);
    }
    this.tiempoInactividad = setTimeout(() => {
      this.cerrarSesion();
    }, this.TIEMPO_INACTIVIDAD);
  }

  private detectarActividad(): void {
    const eventos = ['click'];

    eventos.forEach((evento) => {
      this.renderer.listen('document', evento, () => {
        if (this.getToken()) {
          this.iniciarTemporizadorInactividad();
        }
      });
    });
  }

  private cerrarSesion(): void {
    this.tokenSource.next(null);
    localStorage.removeItem('authToken');
    alert(
      'Tu sesión ha expirado por inactividad. Por favor, inicia sesión de nuevo.'
    );
    this.router.navigate(['/login']);
  } */

/* import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inicioS } from '../models/inicioS';
import { environment } from '../environments/environment';
import { ExisteClienteComponent } from '../app/mensajes/existe-cliente/existe-cliente.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class PeticionesService {
  private URL_INICIO = `${environment.urlServidor}usuario/iniciar-sesion`;
  private tokenSource = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSource.asObservable();
  private readonly TIEMPO_INACTIVIDAD = 1 * 60 * 1000;  // 1 minuto de inactividad
  private readonly TIEMPO_EXPIRACION_TOKEN = 15 * 60 * 1000; // 15 minutos de expiración del token

  private renderer: Renderer2;
  private tiempoInactividad: any;
  private eventListeners: (() => void)[] = []; // Para almacenar las funciones de escucha de eventos

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private rendererFactory: RendererFactory2,
    private dialog: MatDialog 
  ) {
    console.log('PeticionesService inicializado');
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  postPeticiones(usuario: string, contrasena: string): Observable<inicioS> {
    const body = {
      identificacion: usuario,
      contrasena: contrasena,
    };

    return this.http.post<inicioS>(this.URL_INICIO, body).pipe(
      switchMap((response) => {
        if (response.token) {
          console.log('Token recibido:', response.token);
          this.setToken(response.token);
          localStorage.setItem('areaId', response.areaId.toString());
        }
        return [response];
      })
    );
  }

  setToken(token: string): void {
    this.tokenSource.next(token);
    localStorage.setItem('authToken', token);
    this.iniciarTemporizadorInactividad(); // Iniciar temporizador de inactividad solo después de login.
    this.detectarActividad(); // Llamar al método para detectar actividad después de iniciar sesión
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const payload = this.decodeToken(token);
    if (!payload || !payload.iat) return true;

    const creationDate = payload.iat * 1000;
    const expirationDate = creationDate + this.TIEMPO_EXPIRACION_TOKEN;

    return Date.now() > expirationDate;
  }

  decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = atob(parts[1]);
    return JSON.parse(payload);
  }

  redirectToLogin(): void {
    console.log('Redirigiendo al login...');
    this.router.navigate(['/login']);
  }

  private iniciarTemporizadorInactividad(): void {
    console.log('Iniciando temporizador de inactividad');
    if (this.tiempoInactividad) {
      clearTimeout(this.tiempoInactividad); // Cancelar el temporizador anterior
      console.log('Temporizador anterior cancelado');
    }
    this.tiempoInactividad = setTimeout(() => {
      console.log('Tiempo de inactividad alcanzado, cerrando sesión');
      this.cerrarSesion();
    }, this.TIEMPO_INACTIVIDAD);
  }

  private detectarActividad(): void {
    const eventos = ['click', 'keydown', 'mousemove', 'scroll'];

    // Si ya está escuchando eventos, no volver a agregar
    if (this.eventListeners.length > 0) return;

    // Almacena las funciones de escucha
    this.eventListeners = eventos.map((evento) => {
      const listener = this.renderer.listen('document', evento, () => {
        if (this.getToken()) { // Solo procesar si hay un token
          console.log(`Actividad detectada: ${evento}`);
          this.iniciarTemporizadorInactividad(); // Reiniciar el temporizador si hay actividad
        }
      });
      return listener;
    });
  }

  private cerrarSesion(): void {
    console.log('Cerrando sesión por inactividad');
    this.tokenSource.next(null);
    localStorage.removeItem('authToken');
    this.dialog.open(ExisteClienteComponent, {
      width: '250px',
      data: { message: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.' },
    });

    this.router.navigate(['/login']);

    // Eliminar las escuchas de eventos cuando se cierra sesión
    this.detenerDeteccionActividad();
  }

  private detenerDeteccionActividad(): void {
    // Detener todos los eventos escuchados
    this.eventListeners.forEach((listener) => listener());
    this.eventListeners = []; // Limpiar el array de funciones de escucha
    console.log('Detección de actividad detenida');
  }
} */
