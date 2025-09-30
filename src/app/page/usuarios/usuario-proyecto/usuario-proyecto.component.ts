import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../../services/proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProyectoResponse } from '../../../../models/proyecto';

@Component({
  selector: 'app-usuario-proyecto',
  templateUrl: './usuario-proyecto.component.html',
  styleUrls: ['./usuario-proyecto.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class UsuarioProyectoComponent implements OnInit {
  proyectos: any;
  nodocumento!: number;

  constructor(
    private proyectoService: ProyectoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.nodocumento = Number(params.get('nodocumento'));
      if (this.nodocumento) {
        this.cargarProyectos();
      }
    });
  }

  cargarProyectos(): void {
  this.proyectoService.getProyectosPorUsuario(this.nodocumento).subscribe({
    next: (res) => {
      this.proyectos = res.proyectos; 
    },
    error: (err) => {
      console.error('Error al cargar proyectos', err);
    }
  });
}

}
