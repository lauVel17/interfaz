import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExisteClienteComponent } from './existe-cliente.component';

describe('ExisteClienteComponent', () => {
  let component: ExisteClienteComponent;
  let fixture: ComponentFixture<ExisteClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExisteClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExisteClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
