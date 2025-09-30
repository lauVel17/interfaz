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
import { UsuarioService } from '../../../../services/usuario.service';
import { ErrorComponent } from '../../../mensajes/error/error.component';
import { ConfirmDialogComponent } from '../../../mensajes/confirm-eliminar/confirm-eliminar.component';
import { CodigoRService } from '../../../../services/codigoR.service';

const letrasSoloValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s',.]+$/;

  if (control.value && !regex.test(control.value)) {
    return { letrasSolo: true };
  }
  return null;
};
const numerosSoloValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  if (control.value && !/^\d{5,10}$/.test(control.value)) {
    return { numerosSolo: true };
  }
  return null;
};

@Component({
  selector: 'app-update-u',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-u.component.html',
  styleUrls: ['./update-u.component.css'],
})
export class UpdateUComponent implements OnInit {
  usuarioForm: FormGroup;

  departamentos: consultarDepartamento[] = [];
  ciudades: consultarCiudad[] = [];
  nodocumento!: number;
  datosOriginales: any = {};
  identificacionUs: string = '';
  identificacionYaExiste: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private identificacionUService: IdentificacionUService,
    private codigoR: CodigoRService
  ) {
    this.usuarioForm = this.fb.group({
      nodocumento: [{ value: '', disabled: true }],
      nombreapellido: ['', [Validators.required, letrasSoloValidator]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [
          Validators.required,
          numerosSoloValidator,
          Validators.pattern(/^\d{10}$/),
        ],
      ],

      fechaingreso: [{ value: '', disabled: true }],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.nodocumento = +params.get('nodocumento')!;
      if (this.nodocumento) {
        this.loadUsuarioData();
      }
    });
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = parseInt(target.value, 10);

    this.identificacionUService
      .getCiudadesPorDepartamento(departamentoId)
      .subscribe((ciudades) => {
        this.ciudades = ciudades;
        this.usuarioForm.patchValue({ ciudad: '' });
      });
  }
  loadUsuarioData(): void {
    if (!this.nodocumento) {
      console.error('Número de documento del usuario no definido');
      return;
    }

    this.usuarioService
      .getUsuarioById(this.nodocumento)
      .pipe(
        switchMap((usuarioData: usuarios) => {
          this.usuarioForm.patchValue({
            nodocumento: usuarioData.nodocumento,
            nombreapellido: usuarioData.nombreapellido,
            correo: usuarioData.correo,
            telefono: usuarioData.telefono,
            fechaingreso: usuarioData.fechaingreso,
            ciudad: usuarioData.ciudadid,
          });

          this.datosOriginales = this.usuarioForm.getRawValue();
          this.usuarioForm.markAsPristine();
          return this.identificacionUService
            .getCiudadById(usuarioData.ciudadid)
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
                    usuarioData,
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
          this.usuarioForm.patchValue({
            ciudad: ciudad.idciudad,
            departamento: departamento.iddepartamento,
          });

          this.departamentos = departamentos;
          this.ciudades = ciudades.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          );
          this.datosOriginales = this.usuarioForm.getRawValue();
          this.usuarioForm.markAsPristine();
        },
        error: (err) => {
          console.error('Error cargando datos del usuario', err);
        },
      });
  }

  actualizarUsuario(nodocumento: number): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      Object.values(this.usuarioForm.controls).forEach((control) =>
        control.markAsDirty()
      );
      return;
    }
    this.usuarioForm.get('nodocumento')?.enable();
    this.usuarioForm.get('fechaingreso')?.enable();
    const cambiosDetectados = this.codigoR.verificarCambios(
      this.datosOriginales,
      this.usuarioForm.getRawValue()
    );

    if (!cambiosDetectados) {
      return;
    }

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que quieres actualizar el usuario?.' },
    });

    confirmDialog.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;

      const usuarioData = this.usuarioForm.value;

      const datosActualizados = {
        nombreapellido: usuarioData.nombreapellido,
        correo: usuarioData.correo,
        telefono: usuarioData.telefono,
        fechaingreso: usuarioData.fechaingreso,
        ciudadId: usuarioData.ciudad,
      };

      this.usuarioService.putUsuarios(nodocumento, datosActualizados).subscribe(
        (response: actualizarUsuario) => {
          this.dialog
            .open(AvisosComponent, {
              width: '300px',
              data: { message: response.msg },
            })
            .afterClosed()
            .subscribe(() => {
              this.usuarioForm.get('nodocumento')?.disable();
              this.usuarioForm.get('fechaingreso')?.disable();
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
