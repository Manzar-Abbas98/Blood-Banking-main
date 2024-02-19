import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityCrieteriaComponent } from './eligibility-crieteria.component';

describe('EligibilityCrieteriaComponent', () => {
  let component: EligibilityCrieteriaComponent;
  let fixture: ComponentFixture<EligibilityCrieteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EligibilityCrieteriaComponent]
    });
    fixture = TestBed.createComponent(EligibilityCrieteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
