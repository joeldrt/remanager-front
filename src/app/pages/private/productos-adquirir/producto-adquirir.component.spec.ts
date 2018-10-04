import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAdquirirComponent } from './productos-adquirir.component';

describe('ProductosAdquirirComponent', () => {
  let component: ProductosAdquirirComponent;
  let fixture: ComponentFixture<ProductosAdquirirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosAdquirirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosAdquirirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
