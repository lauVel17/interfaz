import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormsModule,
} from '@angular/forms';
import { usuarioCrear, usuarios } from '../../../../models/usuarios';
import { UsuarioService } from '../../../../services/usuario.service';
import {
  consultarDepartamento,
  consultarPaís,
  identificacionUs,
  identificacionUsa,
} from '../../../../models/identificacionu';
import { consultarCiudad } from '../../../../models/identificacionu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ErrorComponent } from '../../../mensajes/error/error.component';
import { AvisosComponent } from '../../../mensajes/avisos/avisos.component';
import { IdentificacionUService } from '../../../../services/identificacionu.service';

const letrasSoloValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  if (control.value && !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(control.value)) {
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
  selector: 'app-create-u',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-u.component.html',
  styleUrls: ['./create-u.component.css'],
})
export class CreateUComponent implements OnInit {
  identificacion: string | null = null;
  crearUsuarioForm: FormGroup;
  paises: consultarPaís[] = [];
  departamentos: consultarDepartamento[] = [];
  ciudades: consultarCiudad[] = [];
  usuarios: usuarios[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private identificacionUService: IdentificacionUService,
    private router: Router,
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<CreateUComponent>
  ) {
    this.crearUsuarioForm = this.formBuilder.group({
      nodocumento: ['', numerosSoloValidator],
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

      fechaingreso: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    /*     this.identificacionUService.identificacion$.subscribe((identificacion) => {
      this.identificacion = identificacion;
      this.crearUsuarioForm.patchValue({ identificacion: this.identificacion });
    }); */

    this.crearUsuarioForm
      .get('nodocumento')
      ?.valueChanges.subscribe((identificacion: string) => {
        /*  console.log('Valor deiden:', identificacion); */
        if (identificacion) {
          this.idenEx(identificacion);
        } else {
        }
      });
    this.identificacionUService
      .getDepartamentosPorPais()
      .subscribe((departamentos: consultarDepartamento[]) => {
        this.departamentos = departamentos;
      });

    this.crearUsuarioForm
      .get('departamento')
      ?.valueChanges.subscribe((departamentoId) => {
        console.log(departamentoId)
        if (departamentoId) {
          this.identificacionUService
            .getCiudadesPorDepartamento(departamentoId)
            .subscribe(
              (ciudades: consultarCiudad[]) => {
                this.ciudades = ciudades.sort((a, b) =>
                  a.nombre.localeCompare(b.nombre)
                );
                this.crearUsuarioForm.get('ciudad')?.setValue('');
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
  idenEx(nodocumento: string): void {
    this.identificacionUService.getUsuarios(nodocumento).subscribe(
      (response: identificacionUsa) => {
        if (response.existeIdent) {
          const errorMessage =
            response.msg ||
            `El No. de identificación: ${nodocumento} ya existe.`;
          this.dialog.open(AvisosComponent, {
            width: '250px',
            data: { message: errorMessage },
          });
        } else {
          /*  console.log('El NIT no existe'); */
        }
      },
      (error) => {
        const errorMessage =
          error.error?.msg ||
          'No se pudo completar la operación. Intenta nuevamente más tarde o contacte al administrador.';

        this.dialog.open(ErrorComponent, {
          width: '250px',
          data: { message: errorMessage },
        });
      }
    );
  }
  crear() {
    if (this.crearUsuarioForm.invalid) {
      this.crearUsuarioForm.markAllAsTouched();
      return;
    }

    if (this.crearUsuarioForm.valid) {
      const {
        nodocumento,
        nombreapellido,
        correo,
        telefono,
        fechaingreso,
        ciudad,
      } = this.crearUsuarioForm.value;

      const estado = 'Activo';

      this.usuarioService
        .postUsuarios(
          nodocumento,
          nombreapellido,
          correo,
          telefono,
          fechaingreso,
          ciudad,
          estado
        )
        .subscribe(
          (response: usuarioCrear) => {
            this.dialog
              .open(AvisosComponent, {
                width: '300px',
                data: { message: response.msg },
              })
              .afterClosed()
              .subscribe(() => {
                const currentUrl = `/admin/usuarios`;
                this.router
                  .navigateByUrl('/', { skipLocationChange: true })
                  .then(() => {
                    this.dialog.closeAll();
                    this.router.navigateByUrl(currentUrl);
                  });
              });
          },
          (error:any) => {
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

  cerrarDialogo(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
