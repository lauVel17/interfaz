import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProyectoComponent } from './proyecto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CiudadService } from 'src/app/services/ciudad.service';

describe('ProyectoComponent', () => {
  let component: ProyectoComponent;
  let fixture: ComponentFixture<ProyectoComponent>;
  let mockCiudadService: jasmine.SpyObj<CiudadService>;

  beforeEach(async () => {
    mockCiudadService = jasmine.createSpyObj('CiudadService', ['obtenerCiudades']);
    mockCiudadService.obtenerCiudades.and.returnValue(of([
      { id: 'bogota', nombre: 'Bogotá' },
      { id: 'medellin', nombre: 'Medellín' }
    ]));

    await TestBed.configureTestingModule({
      declarations: [ProyectoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CiudadService, useValue: mockCiudadService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cities on init', () => {
    expect(component.ciudades.length).toBe(2);
    expect(component.ciudades[0].nombre).toBe('Bogotá');
  });

  it('should mark form as invalid if required fields are missing', () => {
    component.proyectoForm.setValue({
      nombre: '',
      descripcion: '',
      ciudad: '',
      fechaInicio: '',
      fechaFin: ''
    });
    expect(component.proyectoForm.valid).toBeFalse();
  });

  it('should validate that fechaFin is not before fechaInicio', () => {
    component.proyectoForm.setValue({
      nombre: 'Proyecto Test',
      descripcion: 'Descripción',
      ciudad: 'bogota',
      fechaInicio: '2025-10-10',
      fechaFin: '2025-10-01'
    });
    expect(component.proyectoForm.errors?.fechaInvalida).toBeTrue();
  });

  it('should submit valid form', () => {
    spyOn(console, 'log');
    component.proyectoForm.setValue({
      nombre: 'Proyecto Test',
      descripcion: 'Descripción',
      ciudad: 'bogota',
      fechaInicio: '2025-10-01',
      fechaFin: '2025-10-10'
    });
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Proyecto guardado:', component.proyectoForm.value);
  });
});
