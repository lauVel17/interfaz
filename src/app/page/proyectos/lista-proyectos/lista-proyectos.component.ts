import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProyectoService } from '../../../../services/proyecto.service';
import { CodigoRService } from '../../../../services/codigoR.service';
import { proyecto } from '../../../../models/proyecto';
import {
  consultarCiudades,
  consultarDepartamento,
} from '../../../../models/identificacionu';
import { AvisosComponent } from '../../../mensajes/avisos/avisos.component';
import { ErrorComponent } from '../../../mensajes/error/error.component';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css'],
})
export class ListaProyectosComponent implements OnInit {
  proyectos: proyecto[] = [];
  departamentos: consultarDepartamento[] = [];
  ciudades: consultarCiudades[] = [];

  searchTerm: string = '';
  searchTermNombre: string = '';
  searchTermCiudad: string = '';
  searchTermArea: string = '';
  searchTermEstado: string = '';

  currentPage: number = 1;
  itemsPerPage: number | null = 20;
  itemsPerPageString = '20';
  opcionesPorPagina: number[] = [20, 50, 100];
  mostrarTodos: boolean = false;
  ordenAscendente: boolean | null = null;
  fechaNew = new Date().toLocaleDateString();
  /*  campoOrdenar: string = 'nombre'; 
    campoOrdenar2: string = 'identificacion';  */
  tipoBusqueda: string = 'identificacion';

  constructor(
    private proyectoS: ProyectoService,
    public dialog: MatDialog,
    private router: Router,
    private codigoR: CodigoRService
  ) {}

  ngOnInit(): void {
    this.cargarPr();
  }

  ordenarPor(): void {
    /*    this.ordenAscendente = !this.ordenAscendente;
      this.usuarios = this.busquedaService.ordenarUsuarios(
        this.usuarios,
        this.tipoBusqueda,
        this.ordenAscendente
      ); */
  }
  cargarPr(): void {
    this.proyectoS.getProyectos().subscribe((data) => {
      this.proyectos = data;
    });
  }

  buscar(): void {
    /* const vacio =
        (this.tipoBusqueda === 'identificacion' && !this.searchTerm.trim()) ||
        (this.tipoBusqueda === 'nombre' && !this.searchTermNombre.trim()) ||
        (this.tipoBusqueda === 'ciudad' && !this.searchTermCiudad.trim()) ||
        (this.tipoBusqueda === 'area' && !this.searchTermArea.trim()) ||
        (this.tipoBusqueda === 'estado' && !this.searchTermEstado.trim()) ||
        !this.tipoBusqueda;
  
      if (vacio) {
        this.cargarUs();
        return;
      }
  
      this.limpiarCampos(this.tipoBusqueda);
  
      this.usuarioService.getUsuarios().subscribe((data) => {
        this.busquedaService.setUsuarios(data);
        let resultados: any[] = [];
  
        switch (this.tipoBusqueda) {
          case 'identificacion':
            resultados = this.busquedaService.buscarUsuarios(this.searchTerm);
            break;
          case 'nombre':
            resultados = this.busquedaService.buscarPorNombre(
              this.searchTermNombre
            );
            break;
          case 'ciudad':
            resultados = this.busquedaService.buscarPorCiudad(
              this.searchTermCiudad
            );
            break;
          case 'area':
            resultados = this.busquedaService.buscarPorArea(this.searchTermArea);
            break;
          case 'estado':
            resultados = this.busquedaService.buscarPorEstadoU(
              this.searchTermEstado
            );
            break;
          default:
            resultados = data;
        }
  
        this.usuarios = resultados;
        this.currentPage = 1;
      }); */
  }

  limpiarCampos(excepto: string): void {
    if (excepto !== 'identificacion') this.searchTerm = '';
    if (excepto !== 'nombre') this.searchTermNombre = '';
    if (excepto !== 'ciudad') this.searchTermCiudad = '';
    if (excepto !== 'area') this.searchTermArea = '';
    if (excepto !== 'estado') this.searchTermEstado = '';
  }

  ampliarInfo(idproyecto: number): void {
    this.router.navigate(['/admin/infoP', idproyecto]);
  }

  getCiudadName(ciudadId: number): string {
    const ciudad = this.ciudades.find((ciudad) => ciudad.idciudad === ciudadId);
    return ciudad ? ciudad.nombre : 'No disponible';
  }
  cambiarEstado(usuario: any, areaIds: number[]) {
    /*   this.codigoR.cambiarEstadoU(usuario, tienePermiso, 'desdeUsuarios'); */
  }
  /*   cambiarEstado(usuario: any, areaIds: number[]): void {
      const tienePermiso = this.comprobarPer(areaIds);
    
      if (!tienePermiso) {
        return;
      }
    
  
      if ((usuario.area === 5,6)) {
        this.dialog
          .open(AvisosComponent, {
            width: '250px',
            data: { message: 'No se puede inactivar al gerente.' },
          })
          .afterClosed()
          .subscribe(() => {
            window.location.reload();
          });
        return; 
      }
    
      usuario.estado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';
    
      this.usuarioService
        .putEstado(usuario.idUsuario, { estado: usuario.estado })
        .subscribe({
          next: () => {
            console.log(
              `Estado del usuario ${usuario.idUsuario} actualizado a ${usuario.estado}`
            );
          },
          error: (err) => {
            console.error('Error actualizando el estado del usuario:', err);
          },
        });
    } */

  crearProyecto() {
    this.codigoR.abrirCrearProyecto();
  }

  /*  comprobarPer(areaIds: number[]): boolean {
      return this.areaPerService.comprobarPer(areaIds);
    } */
  /* PAGINACIÓN */
  cambiarItemsPorPagina(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.itemsPerPage = value === 'Todos' ? null : +value;
  }

  paginatedProyectos(): proyecto[] {
    if (this.itemsPerPage === null) {
      return this.proyectos;
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.proyectos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(): number[] {
    if (
      this.itemsPerPage === null ||
      this.proyectos.length <= this.itemsPerPage
    ) {
      return [];
    }
    return Array.from(
      { length: Math.ceil(this.proyectos.length / this.itemsPerPage) },
      (_, k) => k + 1
    );
  }

  cambiarPagina(page: number): void {
    if (page < 1 || page > this.totalPages().length) return;
    this.currentPage = page;
  }
  descargarPdf() {
    /*     const encabezado = [
        'Identificación',
        'Nombre completo',
        'Correo',
        'Área',
        'Número de contacto',
        'Estado',
      ];
  
      this.usuarioService.getUsuarios().subscribe({
        next: (data) => {
          this.usuarios = data;
  
          // Generar el cuerpo del reporte
          const cuerpo = this.usuarios.map((usuario) => [
            usuario.identificacion,
            `${usuario.nombre} ${usuario.apellido}`,
            usuario.correo,
            this.getAreaName(usuario.areaId),
            usuario.telefono,
            usuario.estado,
          ]);
  
          this.reporteService.imprimir(
            encabezado,
            cuerpo,
            'Listado de usuarios',
            true,
            true
          );
        },
        error: (err) => {
          this.dialog.open(AvisosComponent, {
            width: '250px',
            data: { message: `${err.error.msg || 'No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.'}` },
          });
        },
      }); */
  }

  descargarExcel() {
    /*    const encabezado = [
        'Identificación',
        'Nombre completo',
        'Correo',
        'Área',
        'Número de contacto',
        'Estado',
      ];
  
      this.usuarioService.getUsuarios().subscribe({
        next: (data) => {
          this.usuarios = data;
  
          const cuerpo = this.usuarios.map((usuario) => [
            usuario.identificacion,
            `${usuario.nombre} ${usuario.apellido}`,
            usuario.correo,
            this.getAreaName(usuario.areaId),
            usuario.telefono,
            usuario.estado,
          ]);
  
          this.reporteService.exportarExcel(
            encabezado,
            cuerpo,
            'Listado de usuarios'
          );
        },
        error: (err) => {
          this.dialog.open(AvisosComponent, {
            width: '250px',
            data: { message: `${err.error.msg || 'No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.'}` },
          });
        },
      }); */
  }
  postularme(idproyecto: number): void {
    const usuarioStr = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioStr!);
    const nodocumento = usuario.nodocumento

    this.proyectoS.postularUsuario(nodocumento, idproyecto).subscribe({
      next: (res) => {
        this.dialog
          .open(AvisosComponent, {
            width: '300px',
            data: { message: res.msg },
          })
          .afterClosed()
          .subscribe(() => {
            const currentUrl = `/admin/proyectos`;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.dialog.closeAll();
                this.router.navigateByUrl(currentUrl);
              });
          });
      },
      error: (error: any) => {
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
}
