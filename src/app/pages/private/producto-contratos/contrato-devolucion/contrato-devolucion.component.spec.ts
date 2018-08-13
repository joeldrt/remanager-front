import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoDevolucionComponent } from './contrato-devolucion.component';

describe('ContratoDevolucionComponent', () => {
  let component: ContratoDevolucionComponent;
  let fixture: ComponentFixture<ContratoDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
