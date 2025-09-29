import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadService } from 'src/app/services/ciudad.service'; // ajusta la ruta si es necesario

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
})
export class ProyectoComponent implements OnInit {
  proyectoForm!: FormGroup;
  ciudades: { id: string; nombre: string }[] = [];

  constructor(private fb: FormBuilder, private ciudadService: CiudadService) {}

  ngOnInit(): void {
    this.proyectoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.required],
      ciudad: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    }, {
      validators: this.validarFechas
    });

    this.cargarCiudades();
  }

  cargarCiudades(): void {
    this.ciudadService.obtenerCiudades().subscribe(data => {
      this.ciudades = data;
    });
  }

  validarFechas(form: FormGroup) {
    const inicio = form.get('fechaInicio')?.value;
    const fin = form.get('fechaFin')?.value;
    return inicio && fin && fin < inicio ? { fechaInvalida: true } : null;
  }

  onSubmit(): void {
    if (this.proyectoForm.valid) {
      console.log('Proyecto guardado:', this.proyectoForm.value);
      // Aquí puedes llamar a un servicio para guardar el proyecto
    } else {
      this.proyectoForm.markAllAsTouched();
    }
  }

  cerrarDialogo(): void {
    // lógica para cerrar el formulario si es modal o componente
  }
}