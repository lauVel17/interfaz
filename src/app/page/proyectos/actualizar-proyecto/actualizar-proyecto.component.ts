import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-actualizar-proyecto',
  templateUrl: './actualizar-proyecto.component.html'
})
export class ActualizarProyectoComponent implements OnInit {
  proyectoForm!: FormGroup;
  ciudades: any[] = [];
  idProyecto!: number;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private ciudadService: CiudadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idProyecto = +this.route.snapshot.paramMap.get('id')!;
    this.proyectoForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      ciudad: [''],
      fechaInicio: [''],
      fechaFin: ['']
    });

    this.ciudadService.obtenerCiudades().subscribe(data => this.ciudades = data);
    this.proyectoService.getProyectoPorId(this.idProyecto).subscribe(data => {
      this.proyectoForm.patchValue(data);
    });
  }

  guardarCambios(): void {
    this.proyectoService.actualizarProyecto(this.idProyecto, this.proyectoForm.value).subscribe(() => {
      alert('Proyecto actualizado correctamente');
    });
  }
}