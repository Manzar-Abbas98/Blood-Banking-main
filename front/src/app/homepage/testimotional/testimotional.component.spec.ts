import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimotionalComponent } from './testimotional.component';

describe('TestimotionalComponent', () => {
  let component: TestimotionalComponent;
  let fixture: ComponentFixture<TestimotionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimotionalComponent]
    });
    fixture = TestBed.createComponent(TestimotionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
