import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { IdentificacionUService } from '../../../../services/identificacionu.service';
import {
  consultarDepartamento,
  consultarPaís,
  consultarCiudad,
  identificacionUsa,
  identificacionUs,
} from '../../../../models/identificacionu';
import { actualizarUsuario, usuarios } from '../../../../models/usuarios';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, map, switchMap } from 'rxjs';
import { AvisosComponent } from '../../../mensajes/avisos/avisos.component';
import { ErrorComponent } from '../../../mensajes/error/error.component';
import { ConfirmDialogComponent } from '../../../mensajes/confirm-eliminar/confirm-eliminar.component';
import { CodigoRService } from '../../../../services/codigoR.service';
import { ProyectoService } from '../../../../services/proyecto.service';
import { actualizarproyecto, proyecto } from '../../../../models/proyecto';

@Component({
  selector: 'app-actualizar-proyecto',
  templateUrl: './actualizar-proyecto.component.html',
  styleUrls: ['./actualizar-proyecto.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ActualizarProyectoComponent implements OnInit {
  proyectoForm: FormGroup;
  departamentos: consultarDepartamento[] = [];
  ciudades: consultarCiudad[] = [];
  idproyecto!: number;
  datosOriginales: any = {};
  identificacionUs: string = '';
  minFechaHoy: string = '';
  minFechaFin: string = '';
  constructor(
    private route: ActivatedRoute,
    private proyectoS: ProyectoService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private identificacionUService: IdentificacionUService,
    private codigoR: CodigoRService
  ) {
    this.proyectoForm = this.fb.group(
      {
        nombre: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }],
        departamento: [{ value: '', disabled: true }],
        ciudad: [{ value: '', disabled: true }],
        fechainicio: ['', [Validators.required]],
        fechafin: ['', [Validators.required]],
      },
      { validators: this.fechaFinMayorValidator }
    );
  }

  ngOnInit(): void {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    this.minFechaHoy = hoy.toISOString().split('T')[0];
    this.minFechaFin = this.minFechaHoy;

    this.proyectoForm
      .get('fechainicio')
      ?.valueChanges.subscribe((fechaInicio: string) => {
        if (fechaInicio) {
          const inicio = new Date(fechaInicio);
          this.minFechaFin = inicio.toISOString().split('T')[0];
        } else {
          this.minFechaFin = this.minFechaHoy;
        }
      });
    this.route.paramMap.subscribe((params) => {
      this.idproyecto = +params.get('idproyecto')!;
      if (this.idproyecto) {
        this.loadProyectoData();
      }
    });
  }
  fechaFinMayorValidator(group: AbstractControl): ValidationErrors | null {
    const inicio = group.get('fechainicio')?.value;
    const fin = group.get('fechafin')?.value;

    if (!inicio || !fin) return null;

    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);

    return fechaFin < fechaInicio ? { fechaFinInvalida: true } : null;
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = parseInt(target.value, 10);

    this.identificacionUService
      .getCiudadesPorDepartamento(departamentoId)
      .subscribe((ciudades) => {
        this.ciudades = ciudades;
        this.proyectoForm.patchValue({ ciudad: '' });
      });
  }
  loadProyectoData(): void {
    if (!this.idproyecto) {
      console.error('id del proyecto no definido');
      return;
    }

    this.proyectoS
      .getProyectoById(this.idproyecto)
      .pipe(
        switchMap((proyectoData: proyecto) => {
          this.proyectoForm.patchValue({
            nombre: proyectoData.nombre,
            descripcion: proyectoData.descripcion,
            ciudad: proyectoData.ciudadid,
            fechainicio: proyectoData.fechainicio,
            fechafin: proyectoData.fechafin,
          });

          this.datosOriginales = this.proyectoForm.getRawValue();
          this.proyectoForm.markAsPristine();
          return this.identificacionUService
            .getCiudadById(proyectoData.ciudadid)
            .pipe(
              switchMap((ciudad) =>
                forkJoin({
                  departamento: this.identificacionUService.getDepartamentoById(
                    ciudad.iddepartamento
                  ),
                  departamentos:
                    this.identificacionUService.getDepartamentosPorPais(),
                  ciudades:
                    this.identificacionUService.getCiudadesPorDepartamento(
                      ciudad.iddepartamento
                    ),
                }).pipe(
                  map(({ departamento, departamentos, ciudades }) => ({
                    proyectoData,
                    ciudad,
                    departamento,
                    departamentos,
                    ciudades,
                  }))
                )
              )
            );
        })
      )
      .subscribe({
        next: ({ ciudad, departamento, departamentos, ciudades }) => {
          this.proyectoForm.patchValue({
            ciudad: ciudad.idciudad,
            departamento: departamento.iddepartamento,
          });

          this.departamentos = departamentos;
          this.ciudades = ciudades.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          );
          this.datosOriginales = this.proyectoForm.getRawValue();
          this.proyectoForm.markAsPristine();
        },
        error: (err) => {
          console.error('Error cargando datos del usuario', err);
        },
      });
  }

  actualizarProyecto(idproyecto: number): void {
    if (this.proyectoForm.invalid) {
      this.proyectoForm.markAllAsTouched();
      Object.values(this.proyectoForm.controls).forEach((control) =>
        control.markAsDirty()
      );
      return;
    }
    this.proyectoForm.enable();
    const cambiosDetectados = this.codigoR.verificarCambios(
      this.datosOriginales,
      this.proyectoForm.getRawValue()
    );

    if (!cambiosDetectados) {
      return;
    }

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que quieres actualizar el proyecyo?' },
    });

    confirmDialog.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;

      const proyectoData = this.proyectoForm.value;

      const datosActualizados = {
        fechainicio: proyectoData.fechainicio,
        fechafin: proyectoData.fechafin,
      };

      this.proyectoS.putproyecto(idproyecto, datosActualizados).subscribe(
        (response: actualizarproyecto) => {
          this.dialog
            .open(AvisosComponent, {
              width: '300px',
              data: { message: response.msg },
            })
            .afterClosed()
            .subscribe(() => {
              this.proyectoForm.disable();
              location.reload();
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
    });
  }
}
