import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { consultarCiudades } from '../../../../models/identificacionu';
import { IdentificacionUService } from '../../../../services/identificacionu.service';
import { CodigoRService } from '../../../../services/codigoR.service';
import { ProyectoService } from '../../../../services/proyecto.service';
import { ActualizarProyectoComponent } from '../actualizar-proyecto/actualizar-proyecto.component';
import { ProyectoUsuariosComponent } from '../proyecto-usuarios/proyecto-usuarios.component';
@Component({
  selector: 'app-resumen-proyecto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-proyecto.component.html',
  styleUrls: ['./resumen-proyecto.component.css'],
})
export class ResumenProyectoComponent implements OnInit {
  idproyecto!: number;
  proyecto: any;
  ciudades: consultarCiudades[] = [];
  tabActivo: string = 'resumen';

  componentesPorTab: { [key: string]: Type<any> } = {
    resumen: ActualizarProyectoComponent,
    contrasena: ProyectoUsuariosComponent
  };

  constructor(
    private proyectoS: ProyectoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private identificacionUService: IdentificacionUService,
    private codigoR: CodigoRService
  ) {}

  ngOnInit(): void {
    this.identificacionUService
      .getCiudades()
      .subscribe((ciudades: consultarCiudades[]) => {
        this.ciudades = ciudades;
      });
    this.route.paramMap.subscribe((params) => {
      this.idproyecto = +params.get('idproyecto')!;
      this.proyectoS.getProyectoById(this.idproyecto).subscribe((data) => {
        this.proyecto = data;
      });
    });
  }

  getCiudadName(ciudadid: number): string {
    const ciudad = this.ciudades.find((ciudad) => ciudad.idciudad === ciudadid);
    return ciudad ? ciudad.nombre : 'No disponible';
  }
}
