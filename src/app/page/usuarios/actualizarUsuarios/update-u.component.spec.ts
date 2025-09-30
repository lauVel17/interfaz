import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUComponent } from './update-u.component';

describe('UpdateUComponent', () => {
  let component: UpdateUComponent;
  let fixture: ComponentFixture<UpdateUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
