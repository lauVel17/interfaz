import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecUsuariosComponent } from './rec-usuarios.component';

describe('RecUsuariosComponent', () => {
  let component: RecUsuariosComponent;
  let fixture: ComponentFixture<RecUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
