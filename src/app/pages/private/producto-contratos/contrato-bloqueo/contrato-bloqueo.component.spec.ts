import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoBloqueoComponent } from './contrato-bloqueo.component';

describe('ContratoBloqueoComponent', () => {
  let component: ContratoBloqueoComponent;
  let fixture: ComponentFixture<ContratoBloqueoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoBloqueoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoBloqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
