import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDanychComponent } from './tabela-danych.component';

describe('TabelaDanychComponent', () => {
  let component: TabelaDanychComponent;
  let fixture: ComponentFixture<TabelaDanychComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaDanychComponent]
    });
    fixture = TestBed.createComponent(TabelaDanychComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
