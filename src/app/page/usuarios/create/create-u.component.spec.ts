import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUComponent } from './create-u.component';

describe('CreateUComponent', () => {
  let component: CreateUComponent;
  let fixture: ComponentFixture<CreateUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
