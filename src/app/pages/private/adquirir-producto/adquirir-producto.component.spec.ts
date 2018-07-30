import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdquirirProductoComponent } from './adquirir-producto.component';

describe('AdquirirProductoComponent', () => {
  let component: AdquirirProductoComponent;
  let fixture: ComponentFixture<AdquirirProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdquirirProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdquirirProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
