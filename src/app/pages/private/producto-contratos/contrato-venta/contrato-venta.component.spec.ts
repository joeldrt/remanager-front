import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoVentaComponent } from './contrato-venta.component';

describe('ContratoVentaComponent', () => {
  let component: ContratoVentaComponent;
  let fixture: ComponentFixture<ContratoVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
