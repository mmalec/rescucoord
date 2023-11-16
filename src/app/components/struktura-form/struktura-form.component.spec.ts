import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrukturaFormComponent } from './struktura-form.component';

describe('StrukturaFormComponent', () => {
  let component: StrukturaFormComponent;
  let fixture: ComponentFixture<StrukturaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrukturaFormComponent]
    });
    fixture = TestBed.createComponent(StrukturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
