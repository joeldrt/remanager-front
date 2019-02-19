import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproyectosComponent } from './adminproyectos.component';

describe('AdminproyectosComponent', () => {
  let component: AdminproyectosComponent;
  let fixture: ComponentFixture<AdminproyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminproyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
