import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZarzadzanieAkcjaComponent } from './zarzadzanie-akcja.component';

describe('ZarzadzanieAkcjaComponent', () => {
  let component: ZarzadzanieAkcjaComponent;
  let fixture: ComponentFixture<ZarzadzanieAkcjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZarzadzanieAkcjaComponent]
    });
    fixture = TestBed.createComponent(ZarzadzanieAkcjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
