import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Proyecto } from '../../../../models/proyecto';
import { ProyectoService } from '../../../../services/proyecto.service';
import { CodigoRService } from '../../../../services/codigoR.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css'],
})
export class ListaProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];

  currentPage: number = 1;
  itemsPerPage: number | null = 20;
  itemsPerPageString = '20';
  opcionesPorPagina: number[] = [20, 50, 100];
  mostrarTodos: boolean = false;
  ordenAscendente: boolean | null = null;
  fechaNew = new Date().toLocaleDateString();

  constructor(
    private proyectoService: ProyectoService,
    public dialog: MatDialog,
    private router: Router,
    private codigoR: CodigoRService
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.getProyectos().subscribe((data) => {
      this.proyectos = data;
    });
  }

  crearProyecto(): void {
    this.codigoR.abrirCrearProyecto(); // método personalizado para abrir diálogo o ruta
  }

  verDetalle(idProyecto: number): void {
    this.router.navigate(['/admin/infoProyecto', idProyecto]);
  }

  cambiarItemsPorPagina(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.itemsPerPage = value === 'Todos' ? null : +value;
    this.itemsPerPageString = value;
    this.currentPage = 1;
  }

  paginatedProyectos(): Proyecto[] {
    if (this.itemsPerPage === null) {
      return this.proyectos;
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.proyectos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(): number[] {
    if (this.itemsPerPage === null || this.proyectos.length <= this.itemsPerPage) {
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

  descargarPdf(): void {
    // Aquí puedes integrar tu lógica de exportación
    // Ejemplo: this.reporteService.imprimir(encabezado, cuerpo, 'Listado de proyectos');
  }

  descargarExcel(): void {
    // Aquí puedes integrar tu lógica de exportación
    // Ejemplo: this.reporteService.exportarExcel(encabezado, cuerpo, 'Listado de proyectos');
  }
}