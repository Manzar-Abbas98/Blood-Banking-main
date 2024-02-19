import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationprocedureComponent } from './donationprocedure.component';

describe('DonationprocedureComponent', () => {
  let component: DonationprocedureComponent;
  let fixture: ComponentFixture<DonationprocedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonationprocedureComponent]
    });
    fixture = TestBed.createComponent(DonationprocedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
