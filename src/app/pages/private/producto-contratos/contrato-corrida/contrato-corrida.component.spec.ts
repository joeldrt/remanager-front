import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoCorridaComponent } from './contrato-corrida.component';

describe('ContratoCorridaComponent', () => {
  let component: ContratoCorridaComponent;
  let fixture: ComponentFixture<ContratoCorridaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoCorridaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoCorridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
