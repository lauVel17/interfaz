import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrasnaComponent } from './contrasna.component';

describe('ContrasnaComponent', () => {
  let component: ContrasnaComponent;
  let fixture: ComponentFixture<ContrasnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContrasnaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrasnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
