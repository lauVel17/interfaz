import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { consultarCiudades } from '../../../../models/identificacionu';
import { IdentificacionUService } from '../../../../services/identificacionu.service';
import { CodigoRService } from '../../../../services/codigoR.service';
import { UpdateUComponent } from '../actualizarUsuarios/update-u.component';
import { ContrasnaComponent } from '../contrasena/contrasna.component';
import { UsuarioProyectoComponent } from '../usuario-proyecto/usuario-proyecto.component';
@Component({
  selector: 'app-rec-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rec-usuarios.component.html',
  styleUrls: ['./rec-usuarios.component.css'],
})
export class RecUsuariosComponent implements OnInit {
  nodocumento!: number;
  usuario: any;
  ciudades: consultarCiudades[] = [];

  tabActivo: string = 'profile';

   componentesPorTab: { [key: string]: Type<any> } = {
    profile: UpdateUComponent,
    contrasena: ContrasnaComponent,
    proyectos: UsuarioProyectoComponent
  }; 

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private identificacionUService: IdentificacionUService,
    private codigoR: CodigoRService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.nodocumento = +params.get('nodocumento')!;
      this.usuarioService.getUsuarioById(this.nodocumento).subscribe((data) => {
        this.usuario = data; 
        console.log(this.usuario);
      });
    });
    this.identificacionUService
      .getCiudades()
      .subscribe((ciudades: consultarCiudades[]) => {
        this.ciudades = ciudades;
      });
  }

  getCiudadName(ciudadid: number): string {
    const ciudad = this.ciudades.find((ciudad) => ciudad.idciudad === ciudadid);
    return ciudad ? ciudad.nombre : 'No disponible';
  }
  cambiarEstado(usuario: any) {
    this.codigoR.cambiarEstadoU(usuario, 'desdeUsuario');
  }
}
