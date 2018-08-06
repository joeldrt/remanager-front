import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgtoolsComponent } from './dgtools.component';

describe('DgtoolsComponent', () => {
  let component: DgtoolsComponent;
  let fixture: ComponentFixture<DgtoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgtoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
