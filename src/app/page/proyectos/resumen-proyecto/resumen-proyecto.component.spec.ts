import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenProyectoComponent } from './resumen-proyecto.component';

describe('ResumenProyectoComponent', () => {
  let component: ResumenProyectoComponent;
  let fixture: ComponentFixture<ResumenProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
