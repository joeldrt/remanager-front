import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosMapComponent } from './proyectos-map.component';

describe('ProyectosMapComponent', () => {
  let component: ProyectosMapComponent;
  let fixture: ComponentFixture<ProyectosMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
