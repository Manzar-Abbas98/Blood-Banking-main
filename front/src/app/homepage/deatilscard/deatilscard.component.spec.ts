import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilscardComponent } from './deatilscard.component';

describe('DeatilscardComponent', () => {
  let component: DeatilscardComponent;
  let fixture: ComponentFixture<DeatilscardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeatilscardComponent]
    });
    fixture = TestBed.createComponent(DeatilscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
