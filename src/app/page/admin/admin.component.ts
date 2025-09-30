import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CodigoRService } from '../../../services/codigoR.service';
import { SesionService } from '../../../services/sesion.service';
import { inicioS } from '../../../models/usuarios';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  usuario: inicioS | null = null;
  usuarioLogueado!: inicioS;
  constructor(
    private router: Router,
    private codigoR: CodigoRService,
    private sesion: SesionService
  ) {}

  ngOnInit(): void {
    this.sesion.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
    });
    this.codigoR.obtenerUsuarioLogueado().subscribe((data) => {
      if (data) {
        this.usuarioLogueado = data.usuario;
        /* console.log(this.usuarioLogueado); */
      }
    });
  }

  toggleSidebar(): void {
    const sidebar = document.querySelector('.sidebar');
    const body = document.querySelector('body');

    if (body) {
      body.classList.toggle('toggle-sidebar');
    }
  }
  crearUsuario() {
    this.codigoR.abrirCrearUsuario();
  }
  crearProyecto() {
    this.codigoR.abrirCrearProyecto();
  }
  logOut(): void {
    this.sesion.logout();
  }
}
