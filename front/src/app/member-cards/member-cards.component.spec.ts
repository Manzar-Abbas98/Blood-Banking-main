import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCardsComponent } from './member-cards.component';

describe('MemberCardsComponent', () => {
  let component: MemberCardsComponent;
  let fixture: ComponentFixture<MemberCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberCardsComponent]
    });
    fixture = TestBed.createComponent(MemberCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
