import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosVisorComponent } from './contratos-visor.component';

describe('ContratosVisorComponent', () => {
  let component: ContratosVisorComponent;
  let fixture: ComponentFixture<ContratosVisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosVisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosVisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
