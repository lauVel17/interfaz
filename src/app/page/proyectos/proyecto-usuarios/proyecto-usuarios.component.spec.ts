import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoUsuariosComponent } from './proyecto-usuarios.component';

describe('ProyectoUsuariosComponent', () => {
  let component: ProyectoUsuariosComponent;
  let fixture: ComponentFixture<ProyectoUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
