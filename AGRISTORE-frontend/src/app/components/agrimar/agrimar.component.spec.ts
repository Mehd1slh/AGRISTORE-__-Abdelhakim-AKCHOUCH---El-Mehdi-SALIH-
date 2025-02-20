import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrimarComponent } from './agrimar.component';

describe('AgrimarComponent', () => {
  let component: AgrimarComponent;
  let fixture: ComponentFixture<AgrimarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgrimarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrimarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
