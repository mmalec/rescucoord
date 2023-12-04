import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZarzadzanieProjektamiComponent } from './zarzadzanie-projektami.component';

describe('ZarzadzanieProjektamiComponent', () => {
  let component: ZarzadzanieProjektamiComponent;
  let fixture: ComponentFixture<ZarzadzanieProjektamiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZarzadzanieProjektamiComponent]
    });
    fixture = TestBed.createComponent(ZarzadzanieProjektamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
