import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  consultarCiudad,
  consultarDepartamento,
  consultarPaís,
  identificacionUs,
  identificacionUsa,
} from '../../../../models/identificacionu';
import { IdentificacionUService } from '../../../../services/identificacionu.service';
import { ProyectoService } from '../../../../services/proyecto.service';
import { proyectoCrear } from '../../../../models/proyecto';
import { AvisosComponent } from '../../../mensajes/avisos/avisos.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../../services/usuario.service';
import { ErrorComponent } from '../../../mensajes/error/error.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class crearProyectoComponent implements OnInit {
  proyectoForm!: FormGroup;
  ciudades: consultarCiudad[] = [];
  departamentos: consultarDepartamento[] = [];

  constructor(
    private fb: FormBuilder,
    private identificacionUService: IdentificacionUService,
    private proyectoS: ProyectoService,
    private router: Router,
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<crearProyectoComponent>
  ) {
    this.proyectoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.identificacionUService
      .getDepartamentosPorPais()
      .subscribe((departamentos: consultarDepartamento[]) => {
        this.departamentos = departamentos;
      });

    this.proyectoForm
      .get('departamento')
      ?.valueChanges.subscribe((departamentoId) => {
        console.log(departamentoId);
        if (departamentoId) {
          this.identificacionUService
            .getCiudadesPorDepartamento(departamentoId)
            .subscribe(
              (ciudades: consultarCiudad[]) => {
                this.ciudades = ciudades.sort((a, b) =>
                  a.nombre.localeCompare(b.nombre)
                );
                this.proyectoForm.get('ciudad')?.setValue('');
              },
              (error) => {
                console.error(
                  'Error al obtener las ciudades por departamento',
                  error
                );
                this.ciudades = [];
              }
            );
        } else {
          this.ciudades = [];
        }
      });
  }

  crear() {
    if (this.proyectoForm.invalid) {
      this.proyectoForm.markAllAsTouched();
      return;
    }

    if (this.proyectoForm.valid) {
      const { nombre, descripcion, ciudad, fechaInicio, fechaFin } =
        this.proyectoForm.value;

      this.proyectoS
        .postUsuarios(nombre, descripcion, ciudad, fechaInicio, fechaFin)
        .subscribe(
          (response: proyectoCrear) => {
            this.dialog
              .open(AvisosComponent, {
                width: '300px',
                data: { message: response.msg },
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
          (error: any) => {
            const mensajeError =
              error.error?.msg ||
              'No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.';

            this.dialog.open(ErrorComponent, {
              width: '300px',
              data: { message: mensajeError },
            });
          }
        );
    }
  }

  cerrarDialogo(): void {}
}
