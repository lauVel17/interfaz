import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProyectoService } from '../../../../services/proyecto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyecto-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyecto-usuarios.component.html',
  styleUrl: './proyecto-usuarios.component.css',
})
export class ProyectoUsuariosComponent {
  proyectos: any;
  idproyecto!: number;

  constructor(
    private proyectoService: ProyectoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idproyecto = Number(params.get('idproyecto'));
      if (this.idproyecto) {
        this.cargarParticipantes();
      }
    });
  }

  cargarParticipantes(): void {
    this.proyectoService.getUsuariosPorProyecto(this.idproyecto).subscribe({
      next: (res) => {
        this.proyectos = res.usuarios;
      },
      error: (err) => {
        console.error('Error al cargar proyectos', err);
      },
    });
  }
}
