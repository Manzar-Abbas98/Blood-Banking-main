import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackRequestComponent } from './callback-request.component';

describe('CallbackRequestComponent', () => {
  let component: CallbackRequestComponent;
  let fixture: ComponentFixture<CallbackRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallbackRequestComponent]
    });
    fixture = TestBed.createComponent(CallbackRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
