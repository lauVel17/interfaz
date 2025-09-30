import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioProyectoComponent } from './usuario-proyecto.component';

describe('UsuarioProyectoComponent', () => {
  let component: UsuarioProyectoComponent;
  let fixture: ComponentFixture<UsuarioProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
